const { entry, copyPluginConfig } = require('./build/commonCopy');
const path = require('path');

module.exports = {
    entry,
    output: {
        path: path.resolve(process.cwd(), 'dist/js'),
        filename: '[name].js',
    },
    mode: 'production',
    plugins: [copyPluginConfig],
};
