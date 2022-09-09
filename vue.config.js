const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  pages: {
    index: {
      entry: 'src/renderer/main.js'
    }
  },
  configureWebpack: {
    externals: ['pg-native']
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
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
