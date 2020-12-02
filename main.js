const path = require('path')
const { app, BrowserWindow, dialog } = require('electron')
const env = require(path.join(__dirname, '/src/api/main/config/env'))

app.on('window-all-closed', function () {
  app.quit()
})

try {
  const server = require(path.join(__dirname, '/src/api/main/server'))({
    pathToDb: app.getPath('userData'),
    cleanDB: true,
  })

  /**
   *
   * ELECTRON
   *
   */
  let mainWindow

  const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 800,
    })

    //  use server for route
    mainWindow.loadURL(`http://localhost:${env.PORT}`)
  }

  app.on('ready', createWindow)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
} catch (err) {
  app.on('ready', () => {
    dialog.showMessageBox(null, {
      type: 'error',
      message: `There was an unknown error \n\n ${err}`,
    })
  })
}
