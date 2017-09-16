import {app, BrowserWindow, dialog, ipcMain, Menu} from 'electron'
import {resolve} from 'path'

const isDev = require('electron-is-dev');
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

const WINDOW_WIDTH = 1100;
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