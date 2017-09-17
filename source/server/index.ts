import {app, BrowserWindow, dialog, ipcMain, Menu} from 'electron'
import {resolve} from 'path'
import * as bittrex from 'node.bittrex.api'
import * as _ from 'lodash'
import * as moment from 'moment'

const isDev = require('electron-is-dev');
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

const WINDOW_WIDTH = 1200;
const WINDOW_HEIGHT = 725;

let mainWindow;

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

const updateTable = () => {
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
            return sum.MarketName.indexOf('BTC-') !== -1;
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
    }).catch();

    setTimeout(function () {
        updateTable();
    }, 1000);
};

if (isSecondInstance) {
    app.quit()
}

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

    updateTable();

    mainWindow.loadURL(mainURL);
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