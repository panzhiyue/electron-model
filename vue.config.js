const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log(path.resolve(__dirname, './src/static'))
let plugins = []

if (process.env.NODE_ENV !== 'production') {
  plugins
    .push
    // new webpack.HotModuleReplacementPlugin()
    // new webpack.DefinePlugin({
    //   __static2: `"${path.join(__dirname, './static').replace(/\\/g, '\\\\')}"`
    // })
    ()
}

if (process.env.NODE_ENV === 'production') {
  // rendererConfig.devtool = ''

  plugins.push(
    // new MinifyPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(__dirname, './static'),
    //     to: path.join(__dirname, './dist_electron/static')
    //     // ignore: ['.*']
    //   }
    // ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  )
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '.',
  pages: {
    index: {
      entry: 'src/renderer/main.js'
    }
  },
  // resolve: {
  //   alias: {
  //     __static: path.resolve(__dirname, './src/static')
  //   }
  // },
  configureWebpack: {
    // externals: ['better-sqlite3'],
    plugins
    // resolve: {
    //   alias: {
    //     __static2: path.resolve(__dirname, './static')
    //   }
    // }
  },
  // chainWebpack: config => {
  //   config.resolve.alias.set('__static2', path.resolve(__dirname, './static'))
  // },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        asar: true
      }
      // builderOptions: {
      //   "productName": "Frank",
      //   "appId": "com.frank.app",
      //   "copyright": "Copyright © 2022 Java_S",
      //   extraResources: [
      //     {from:'./resources',to:'./resources'}],
      //   win: {
      //     "icon": "./resources/app-icon.png"
      //   },
      //   "nsis": {
      //     // "runAfterFinish":false,
      //     // "oneClick":false,
      //     "allowToChangeInstallationDirectory":true,
      //     "createDesktopShortcut":true
      //   },
      // },
    },
    windicss: {}
  }
})
