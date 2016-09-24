const Builder = require('systemjs-builder');
const fs = require('mz/fs');

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
        `).catch(function(error) {
            console.log(error);
        });
    }).catch(function(error) {
        console.log(error);
    });
});
