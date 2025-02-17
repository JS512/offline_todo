
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

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


const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./datas/chinook.sqlite3');

// insert one row into the student table
db.run(`CREATE TABLE IF NOT EXISTS Todo(
    plan_date timestamp,
    plan text,
    create_test timestamp default CURRENT_TIMESTAMP,
    start INTEGER,
    hold INTEGER,
    processing INTEGER,
    done INTEGER
  );`, function (err) {
    if (err) {
        return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// // close the database connection
db.close();


ipcMain.on('get_sqlite3', (evt, payload) => {
  evt.sender.send('get_sqlite33', {sqlite : "sqlite3"})
})