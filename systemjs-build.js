const Builder = require('systemjs-builder');

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
        ts: 'app/client/node_modules/plugin-typescript/lib/',
        typescript: 'app/client/node_modules/typescript/lib/',
        'plugin-babel': 'app/client/node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'app/client/node_modules/systemjs-plugin-babel/systemjs-babel-browser.js'
    }
});

builder.buildStatic('app/client/components/*/*.ts', 'app/client/prendus.js', {
    minify: false
});
