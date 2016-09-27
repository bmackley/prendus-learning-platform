//documentation: https://github.com/paulmillr/chokidar
//TODO this is a monolith. It is doing too many things. We could split it up at least into a file watcher and SystemJS bundler

const chokidar = require('chokidar');
const Builder = require('systemjs-builder');
const fs = require('mz/fs');
const http2 = require('http2');

const builder = createBuilder();

chokidar.watch([
    "app/client/index.html",
    "app/client/components/*/*",
    "app/client/redux/*",
    "app/client/styles/*",
    "app/client/interfaces/*"
]).on('change', (path) => {

    const fileEnding = path.substr(path.lastIndexOf('.') + 1);

    if (fileEnding === 'ts') {
        bundle(builder, path);
    }
    else {
        sendRequestToLiveReloadServer();
    }
});

function createBuilder() {
    const builder = new Builder();
    builder.config({
        transpiler: 'plugin-babel',
        typescriptOptions: {
            target: 'es6',
            module: 'es6'
        },
        meta: {
            '*.ts': {
                loader: 'ts'
            }
        },
        packages: {
            ts: {
                main: 'plugin.js'
            },
            typescript: {
                main: 'typescript.js',
                meta: {
                    'typescript.js': {
                        exports: 'ts'
                    }
                }
            }
        },
        map: {
            ts: './node_modules/plugin-typescript/lib/',
            typescript: './node_modules/typescript/lib/',
            'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
            'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js'
        }
    });

    return builder;
}

function bundle(builder, path) {
    builder.invalidate(path);
    let startTime = new Date();
    builder.buildStatic(`
        (app/client/components/*/*.ts) +
        (app/client/bower_components/solutia-maxima-components/components/*/*.ts) +
        (app/client/bower_components/view-quiz-component/*.ts) +
        (app/client/bower_components/video-viewer-component/*.ts)
        `, 'app/client/dist/prendus.js', {
        minify: false
    }).then(function() {
        fs.readFile(__dirname + '/app/client/dist/prendus.js', 'utf8').then(function(fileContents) {
            fs.writeFile(__dirname + '/app/client/dist/prendus.js', `
                window.addEventListener('WebComponentsReady', function() {
                    ${fileContents}
                });
            `).then(() => {
                sendRequestToLiveReloadServer();
                const endTime = new Date();
                console.log(`bundle complete: ${(endTime.getTime() - startTime.getTime()) / 1000} seconds`);
            }).catch(function(error) {
                console.log(error);
            });
        }).catch(function(error) {
            console.log(error);
        });
    });
}

function sendRequestToLiveReloadServer() {
    http2.request({
        host: 'localhost',
        path: '/',
        port: '32567',
        method: 'POST',
        rejectUnauthorized: false
    }).end();
}
