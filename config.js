let path = require('path');

module.exports = {
    build: {
        releasesRoot: path.resolve(__dirname, 'releases'),
        outputRoot: path.resolve(__dirname, 'dist'),
        assetsSubDirectory: 'assets',
        productionSourceMap: true
    },
    release: {
        platform: 'win32'
    },
    dev: {
        port: 8080,
        proxyTable: {},
    }
};
