import {app, BrowserWindow, dialog, ipcMain, Menu} from 'electron'
import {resolve} from 'path'
import * as bittrex from 'node.bittrex.api'
import * as _ from 'lodash'
import * as moment from 'moment'
import * as fs from 'fs'

const isDev = require('electron-is-dev');
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

const WINDOW_WIDTH = 1000;
const WINDOW_HEIGHT = 780;

let mainWindow;

let base = 'BTC';
let market = 'BTC-ETH';

(process as NodeJS.EventEmitter).on('uncaughtException', error => {
    log.error(error)
});

const isSecondInstance = app.makeSingleInstance(() => {
    if (mainWindow) {
        if (mainWindow.isMinimized())
            mainWindow.restore();

        if (!mainWindow.isVisible())
            mainWindow.show();

        mainWindow.focus()
    }
});

const getMarketSumaries = () => {
    Promise.all([
        new Promise((resolve, reject) => {
            bittrex.getmarkets(markets => {
                if (!markets)
                    return reject();

                if (markets.result) {
                    resolve(markets.result)
                } else {
                    reject(markets.error)
                }
            });
        }),
        new Promise((resolve, reject) => {
            bittrex.getmarketsummaries(summaries => {
                if (!summaries)
                    return reject();

                if (summaries.result) {
                    resolve(summaries.result)
                } else {
                    reject(summaries.error)
                }
            });
        })
    ]).then(values => {
        let markets = values[0];
        let summaries = values[1];

        let sums = _.filter(_.map(summaries, summary => {
            let market = _.find(markets, market => {
                return market.MarketName === summary.MarketName;
            });

            if (market) {
                summary.Currency = market.MarketCurrencyLong;
            }

            return summary;
        }), sum => {
            return sum.MarketName.indexOf(base + '-') !== -1;
        });

        let items = [];

        _.each(sums, sum => {
            items.push({
                market: sum.MarketName,
                currency: sum.Currency,
                volume: (sum.Volume * sum.Last).toFixed(3),
                change24: ((sum.Last - sum.PrevDay) / sum.PrevDay * 100).toFixed(1),
                change: 0,
                lastPrice: sum.Last,
                high: sum.High,
                low: sum.Low,
                added: moment(sum.Created).format('YYYY/MM/DD')
            })
        });

        mainWindow.webContents.send('market:summaries', items);
    }).catch(e => console.log(e));

    setTimeout(function () {
        getMarketSumaries();
    }, 1000);
};

const getBalance = () => {
    bittrex.getbalances(res => {
        if (res) {
            mainWindow.webContents.send('market:balance', [
                _.find(res.result, item => {
                    return item.Currency === market.split('-')[0]
                }),
                _.find(res.result, item => {
                    return item.Currency === market.split('-')[1]
                })
            ]);
        }

        setTimeout(function () {
            getBalance();
        }, 1000);
    })
};

const getBuyOrders = () => {
    bittrex.getorderbook({market: market, type: 'buy'}, res => {
        if (res) {
            mainWindow.webContents.send('market:buy:orders', _.take(res.result, 5));
        }

        setTimeout(function () {
            getBuyOrders();
        }, 10000);
    })
};

const getSellOrders = () => {
    bittrex.getorderbook({market: market, type: 'sell'}, res => {
        if (res) {
            mainWindow.webContents.send('market:sell:orders', _.take(res.result, 5));
        }

        setTimeout(function () {
            getSellOrders();
        }, 3000);
    })
};

const getMarketHistory = () => {
    bittrex.getmarkethistory({market: market}, res => {
        if (res) {
            mainWindow.webContents.send('market:histories', _.take(res.result, 5));
        }

        setTimeout(function () {
            getMarketHistory();
        }, 3000);
    })
};

const getOpenOrders = () => {
    bittrex.getopenorders({market: market}, res => {
        if (res) {
            mainWindow.webContents.send('market:open:orders', _.take(res.result, 5));
        }

        setTimeout(function () {
            getOpenOrders();
        }, 3000);
    })
};

const getCompletedOrders = () => {
    bittrex.getorderhistory({market: market}, res => {
        if (res) {
            mainWindow.webContents.send('market:completed:orders', _.take(res.result, 5));
        }

        setTimeout(function () {
            getCompletedOrders();
        }, 3000);
    })
};

if (isSecondInstance) {
    app.quit()
}

const MAIN_CONFIG = app.getPath('userData') + '/config_main.json';

const getSettings = () => {
    if (fs.existsSync(MAIN_CONFIG)) {
        return JSON.parse(fs.readFileSync(MAIN_CONFIG, 'utf8').toString());
    } else
        return {};
};

app.on('ready', () => {
    if (!isDev) {
        autoUpdater.checkForUpdates();

        app.setLoginItemSettings({
            openAtLogin: true,
        });
    }

    mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        frame: false,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        icon: resolve(__dirname, '../../static/images/logo.ico'),
        show: false,
        backgroundColor: '#fafafa'
    });

    const mainURL = process.env.NODE_ENV === 'development'
        ? `http://localhost:9080`
        : `file://${__dirname}/index.html`;

    mainWindow.setResizable(false);
    mainWindow.setMaximizable(false);

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });

    mainWindow.webContents.on('did-finish-load', () => {

    });

    ipcMain.on('market:base', (e, data) => base = data);
    ipcMain.on('market:market', (e, data) => market = data);
    ipcMain.on('market:config', (e, data) => {
        const APIKEY = data.apiKey;
        const APISECRET = data.apiSecret;

        if (APIKEY && APISECRET) {
            bittrex.options({
                'apikey': APIKEY,
                'apisecret': APISECRET,
                'stream': false,
                'verbose': false,
                'cleartext': false
            });

            getMarketSumaries();
            getBalance();
            getBuyOrders();
            getSellOrders();
            getMarketHistory();
            getOpenOrders();
            getCompletedOrders();
        }
    });

    mainWindow.loadURL(mainURL);
});

app.on('window-all-closed', () => {
    app.quit()
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'FastBit Update',
        message: 'A new version is available. Do you want to update now?'
    }, function (response) {
        if (response === 0) {
            autoUpdater.quitAndInstall();
        }
    })
});