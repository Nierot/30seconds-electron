const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')
os = require('os')
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    //frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  var startserverbat = (app.getAppPath() + '\\dist\\manage\\manage.exe runserver')
  const child = spawn('cmd.exe', ['/c', startserverbat],)

  
  // and load the index.html of the app.
  win.loadURL('http://127.0.0.1:8000')


  win.on('closed', () => {
    win = null;
    spawn('cmd.exe', ['/c', (app.getAppPath() + '\\killserver.bat')])
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.