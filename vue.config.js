const WebpackCdnPlugin = require('webpack-cdn-plugin');
const { entry, copyPluginConfig } = require('./build/commonCopy');
module.exports = {
    devServer: {
        port: 2476,
    },
    pages: {
        popup:
            process.env.NODE_ENV === 'production'
                ? {
                      entry: 'src/popup/index.js',
                      template: 'public/index.html',
                      filename: 'popup.html',
                  }
                : {
                      entry: 'src/popup/index.js',
                      template: 'public/index.html',
                      filename: 'index.html',
                  },
    },
    productionSourceMap: false,
    configureWebpack: {
        entry,
        output: {
            filename: 'js/[name].js',
        },
        plugins:
            process.env.NODE_ENV === 'production'
                ? [
                      new WebpackCdnPlugin({
                          modules: [
                              {
                                  name: 'vue',
                                  var: 'Vue',
                                  prodUrl: '/js/vue.min.js',
                              },
                          ],
                      }),
                      copyPluginConfig,
                  ]
                : [],
    },
};
