process.env.NODE_ENV = 'development';

require('electron-debug')({showDevTools: true});

require('electron').app.on('ready', () => {
    let installExtension = require('electron-devtools-installer');
    installExtension.default(installExtension.VUEJS_DEVTOOLS)
        .then(() => {
        })
        .catch(error => {
            console.log('Unable to install `vue-devtools`: \n', error)
        })
});

require('./index');
