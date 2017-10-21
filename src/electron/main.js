const electron = require('electron')

const fs = require('fs');

// Module to control application life.
var { app, BrowserWindow, ipcMain } = electron;

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1200, height: 900 })
console.log(url.format({
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  slashes: true
}));
console.log(__dirname)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


ipcMain.on('exportDatabase', (event, json) => {
  var time = new Date();
  fs.writeFile('database/migration/export_' + time.getTime() + '.json', json, (err) => {
    if (err) {
      event.returnValue = "An error ocurred creating the file " + err.message
    }

    event.returnValue = "The file has been succesfully saved";
  });
})

ipcMain.on('importDatabase', (event, filename) => {

  try {
    fs.readFile('database/migration/' + filename, 'utf8', (err, data) => {
      if (err) {
        event.returnValue = "An error ocurred reading the file! " + err.message
      }
      event.returnValue = data;
    });
  } catch(err) {
    event.returnValue = "An error ocuured trying to open an file! " + err.message;
  }
})