'use strict';

process.env.BABEL_ENV = 'server';

const path = require('path');
const {dependencies} = require('../package.json');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');

let mainConfig = {
    entry: {
        server: path.join(__dirname, '../source/server/index.ts')
    },
    externals: [
        ...Object.keys(dependencies || {})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    node: {
        __dirname: process.env.NODE_ENV !== 'production',
        __filename: process.env.NODE_ENV !== 'production'
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '../dist')
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.ts', '.json', '.node']
    },
    target: 'electron-main'
};

if (process.env.NODE_ENV !== 'production') {
    mainConfig.plugins.push(
        new webpack.DefinePlugin({
            '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
        })
    )
}

if (process.env.NODE_ENV === 'production') {
    mainConfig.plugins.push(
        new BabelMinifyPlugin({
            removeConsole: true,
            removeDebugger: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    )
}

module.exports = mainConfig;
