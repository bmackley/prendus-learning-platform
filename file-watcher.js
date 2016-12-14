//documentation: https://github.com/paulmillr/chokidar
//TODO this is a monolith. It is doing too many things. We could split it up at least into a file watcher and SystemJS bundler

const chokidar = require('chokidar');
const Builder = require('systemjs-builder');
const fs = require('mz/fs');
const http2 = require('http2');

const builder = createBuilder();

//bundle once when the script first runs
bundle(builder, '*');

//these are the paths to the files being watched
chokidar.watch([
    "app/client/index.html",
    "app/client/components/*/*",
    "app/client/redux/*",
    "app/client/styles/*",
    "app/client/typings/*",
    "app/client/node_modules/prendus-services/*/*"
]).on('change', (path) => {

    const fileEnding = path.substr(path.lastIndexOf('.') + 1);

    if (fileEnding === 'ts') {
        //rebundle if the file that changed is a TypeScript file
        bundle(builder, path);
    }
    else {
        //just refresh the browser tab if the file that changed is not a TypeScript file
        sendRequestToLiveReloadServer();
    }
});

//this is where we configure the builder with the transpilation options that we want
function createBuilder() {
    const builder = new Builder();
    builder.config({
        transpiler: 'ts',
        typescriptOptions: {
            target: 'es5',
            module: 'system'
        },
        meta: {
            '*.ts': {
                loader: 'ts'
            }
        },
        packages: {
            '/': {
                defaultExtension: 'ts'
            },
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
            typescript: './node_modules/typescript/lib/'
        }
    });

    return builder;
}

function bundle(builder, path) {
    builder.invalidate(path); //This makes everything super fast by telling the builder the exact file that was changed
    let startTime = new Date();
    //bundle all of the following files
    builder.buildStatic(`
        (app/client/components/*/*.ts) +
        (app/client/bower_components/prendus-question-components/components/*/*.ts) +
        (app/client/bower_components/prendus-quiz-viewer-component/*.ts) +
        (app/client/bower_components/prendus-video-viewer-component/*.ts)
        `, 'app/client/dist/prendus.js', {
        minify: false
    }).then(function() {
        //this wraps the bundle that we just made with an event listener to fix a bug with Mozilla
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

//This hits the live reload server to tell the client to refresh the browser
function sendRequestToLiveReloadServer() {
    http2.request({
        host: 'localhost',
        path: '/',
        port: '32567',
        method: 'POST',
        rejectUnauthorized: false
    }).end();
}
