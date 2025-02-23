
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
  document.addEventListener('keydown', (event) => {
    if(event.key=="F12"){ //F12
        //메인프로세스로 toggle-debug 메시지 전송 (디버그 툴 토글시켜라)        
        ipcRenderer.send('toggle-debug', 'an-argument')
    }
    else if(event.key=="F5"){ //F5
        //메인프로세스로 refresh 메시지 전송 (페이지를 갱신시켜라)
        ipcRenderer.send('refresh', 'an-argument')
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




