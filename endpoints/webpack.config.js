import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default {
    stats: 'errors-only',
    mode: process.env.NODE_ENV,
    target: 'node',
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    externals: [nodeExternals()],
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, path.resolve(__dirname, 'dist')],
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        ]
    },
    plugins: [
        ...[new CleanWebpackPlugin()],
        ...(process.env.NODE_ENV === 'production'
            ? []
            : [new webpack.HotModuleReplacementPlugin(), new Dotenv()])
    ]
};
