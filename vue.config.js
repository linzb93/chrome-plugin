const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

module.exports = {
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
                      new CopyWebpackPlugin([
                          {
                              from: `${path.resolve('src')}/common/js/vue.min.js`,
                              to: `${path.resolve('dist')}/js/vue.min.js`,
                          },
                          {
                              from: path.resolve('manifest.json'),
                              to: `${path.resolve('dist')}/manifest.json`,
                          },
                          {
                              from: `${path.resolve('src')}/common/imgs`,
                              to: `${path.resolve('dist')}/imgs`,
                          },
                      ]),
                  ]
                : [],
    },
};