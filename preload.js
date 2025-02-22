
const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })


  
    
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
      // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('get_renderer', {
  send_data: (channel, data) => ipcRenderer.send(channel, data),
  regist_receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
      // we can also expose variables, not just functions
})




