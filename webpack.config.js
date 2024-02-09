const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function source(url) {
    return path.resolve('src', ...url.split('/'));
}
function target(url) {
    return path.resolve('dist', ...url.split('/'));
}

module.exports = {
    entry: {
        content: './src/content/index.js',
        background: './src/background/index.js',
    },
    output: {
        path: path.resolve(process.cwd(), 'dist/js'),
        filename: '[name].js',
    },
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin([
            {
                from: source('common/js/vue.min.js'),
                to: target('js/vue.min.js'),
            },
            {
                from: 'manifest.json',
                to: target('manifest.json'),
            },
            {
                from: source('common/imgs'),
                to: target('imgs'),
            },
            {
                from: source('background/forbid.html'),
                to: target('template/forbid.html'),
            },
        ]),
    ],
};
