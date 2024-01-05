/* eslint-disable consistent-return */

import chalk from 'chalk';
import child_process from 'child_process';
import path from 'path';
import webpack from 'webpack';
import ps from 'ps-node';
import Loader from './loader';
import serverConfig from '../../webpack.config';

const handleServerProcessMessages = () => {
    process.serverProcess.on('message', (message) => {
        const processMessages = ['server_closed'];

        if (!processMessages.includes(message)) {
            process.loader.stable(message);
        }
    });
};

const handleServerProcessSTDIO = () => {
    try {
        if (process.serverProcess) {
            process.serverProcess.on('error', (error) => {
                console.log(error);
            });

            process.serverProcess.stdout.on('data', (data) => {
                console.log(data.toString());
            });

            process.serverProcess.stderr.on('data', (data) => {
                process.loader.stop();
                console.log(chalk.redBright(data.toString()));
            });
        }
    } catch (exception) {
        throw new Error(`[actionName.handleServerProcessSTDIO] ${exception.message}`);
    }
};

const startApplicationProcess = () => {
    const serverProcess = child_process.fork(path.resolve('dist/index.js'), [], {
        // NOTE: Pipe stdin, stdout, and stderr. IPC establishes a message channel so we
        // communicate with the child_process.
        silent: true
    });

    process.serverProcess = serverProcess;

    handleServerProcessSTDIO();
    handleServerProcessMessages();
};

const restartApplicationProcess = () => {
    if (process.serverProcess && process.serverProcess.pid) {
        ps.kill(process.serverProcess.pid);
        startApplicationProcess();
    }
};

const startWebpack = () => {
    process.loader.text('Building migration...');
    serverConfig.entry = './src/migration/index.js';
    const serverCompiler = webpack(serverConfig);

    serverCompiler.watch({}, (error, stats) => {
        if (error) {
            console.error(error.stack || error);
            if (error.details) {
                console.error(error.details);
            }
            return;
        }

        if (stats.hasErrors()) {
            process.loader.stop();
            console.log(`\n${chalk.yellowBright('Errors occurred during the build process:')}`);

            console.log(
                stats.toString({
                    assets: false,
                    builtAt: false,
                    cachedAssets: false,
                    cachedModules: false,
                    chunks: false,
                    colors: true,
                    entrypoints: false,
                    hash: false,
                    modules: false,
                    timings: false,
                    version: false
                })
            );
        }
    });

    serverCompiler.hooks.done.tap('App', () => {
        if (!process.serverProcess) {
            process.loader.text('Starting migration...');
            startApplicationProcess();
        } else {
            process.loader.stop();
            process.loader.start('Restarting migration...');
            restartApplicationProcess();
        }
    });
};

const developmentServer = async () => {
    process.loader = new Loader({ defaultMessage: 'Starting migration...' });

    startWebpack();
};

(async () => developmentServer())();
