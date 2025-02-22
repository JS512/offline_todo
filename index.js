
require("dotenv").config();
const { app, BrowserWindow, ipcMain } = require('electron')
const common = require("./static/js/common")
const path = require('node:path')
if (process.env.NODE_ENV === 'development') { require('electron-reload')(__dirname) }



const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    

    
    win.loadFile('index.html')
    win.webContents.openDevTools(); //developer tools
}


//window, linux
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })


//macOS
// app.whenReady().then(() => {
//     createWindow()
  
//     app.on('activate', () => {
//       if (BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
//   })





ipcMain.on('get_todo', async (evt, payload) => {
  common.get_todo_data().then(function(response){
    evt.sender.send('get_sqlite_todo', {sqlite : response})
  })  
})


if(process.argv.length >= 2) {
  let filePath = process.argv[1];
  console.log(process.argv.env)
  //open, read, handle file
}
