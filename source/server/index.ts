import {app, BrowserWindow, dialog, ipcMain, Menu, Tray} from 'electron'
import {resolve} from 'path'

const isDev = require('electron-is-dev');
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

const WINDOW_WIDTH = 1000;
const WINDOW_HEIGHT = 725;

let mainWindow;
let tray;

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

    mainWindow.on('close', event => {
        if (app.quitting) {
            mainWindow = null
        } else {
            event.preventDefault();
            mainWindow.hide()
        }
    });

    mainWindow.webContents.on('did-finish-load', () => {

    });

    tray = new Tray(resolve(__dirname, '../../static/images/logo.ico'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show',
            click: function () {
                mainWindow.show();
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Quit',
            click: function () {
                dialog.showMessageBox({
                    type: 'question',
                    buttons: ['Yes', 'No'],
                    title: 'FastBit',
                    message: 'Do you really want to quit?'
                }, function (response) {
                    if (response === 0) {
                        app.quit();
                    }
                })
            }
        }
    ]);

    tray.setToolTip('ESMINER Pro.');
    tray.setContextMenu(contextMenu);
    tray.on('double-click', () => {
        mainWindow.show();
    });

    ipcMain.on('command:request', (event, response) => {

    });

    mainWindow.loadURL(mainURL);
});

app.on('window-all-closed', () => {

});

app.on('before-quit', () => {
    app.quitting = true
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'ESMINER Update',
        message: 'A new version is available. Do you want to update now?'
    }, function (response) {
        if (response === 0) {
            autoUpdater.quitAndInstall();
        }
    })
});