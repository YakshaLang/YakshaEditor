const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        "app": './monaco-index.js',
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        // "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
        // "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
        // "html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
        // "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
    },
    output: {
        globalObject: 'self',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ttf$/,
                // Manual hack to fix font loading in monaco-editor in webui+webpack monster
                // first run this wil file-loader, then replace ttf redirect file with real ttf
                // then switch to null-loader
                use: ['null-loader']
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
};
