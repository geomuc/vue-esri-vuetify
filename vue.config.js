const ArcGISPlugin = require("@arcgis/webpack-plugin");
const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module.rule('eslint')
    .use('eslint-loader')
    .tap(options => {
      options.configFile = path.resolve(__dirname, ".eslintrc");
      return options;
    });
    config.module.rule('strreplace').test(/\.js$/).use('string-replace-loader').loader('string-replace-loader').options({
      search: "dojo/domReady!",
      replace: "dojo/ready"
    });
  },
    css: {
      loaderOptions: {
        postcss: {
          config:{
            path:__dirname
          }
        }
      }
    },
  configureWebpack:{
    plugins: [
      new ArcGISPlugin({
        useDefaultAssetLoaders:false
      }),
      ],
      node: {
        process: false,
        global: false,
        fs: "empty"
      },
      optimization: {
        minimize: true,
        splitChunks: {
          minChunks:Infinity,
            chunks: 'all',
        }
      }
  },
  publicPath: process.env.NODE_ENV === 'production' ? "/" : '/'
}