import { app, Menu, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { windowListener } from './utils/electron/windowBasic.js'
import electronDebug from 'electron-debug'
electronDebug({ showDevTools: true })
const remote = require('@electron/remote/main') //1
remote.initialize() //2
let installExtension = require('electron-devtools-installer')

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
let mainWindow

let winURL =
  process.env.npm_lifecycle_event === 'electron:serve'
    ? `http://localhost:8080`
    : `app://./index.html`

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

const createWindow = () => {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({
    title: 'home',
    center: true,
    show: true,
    frame: true, //去掉头部导航
    resizable: true,
    // width: 400,
    // height: 650,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
      // devTools:false
    }
  })
  createProtocol('app')
  // 加载应用的 index.html
  mainWindow.loadURL(winURL)
  mainWindow.setMinimumSize(800, 600)
  // 打开开发工具
  mainWindow.openDevTools()

  // 当 window 被关闭，这个事件会被触发
  mainWindow.on('closed', function () {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null
  })

  // // 移动窗口  主窗口
  // ipcMain.on('move-main', (event, pos) => {
  //     mainWindow.setBounds({ x: pos.x, y: pos.y, width: 400, height: 650 })
  // })

  windowListener(mainWindow, 'main')
  remote.enable(mainWindow.webContents)
}

app.on('ready', () => {
  installExtension
    .default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
  createWindow()
  // mainWindow.maximize()
  Menu.setApplicationMenu(null)
})

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow()
  }
})

//当所有窗口被关闭了，退出
app.on('window-all-closed', () => {
  //在OS X上，通常用户在明确按下Cmd+Q之前
  //应用会保持活动状态
  if (process.platform == 'darwin') {
    app.quit()
  }
})

//自动刷新
try {
  require('electron-reloader')(module, {})
} catch (_) {}
