const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  //window
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  
  //file
  openFile: () => ipcRenderer.invoke("file:open"),
  createFile: (file) => ipcRenderer.invoke("file:create",file),
  saveFile: (data, name) =>ipcRenderer.invoke("file:save",data,name),
  exportPDF: () => ipcRenderer.invoke("export-pdf"),

  //course
  insertCourse: (course) => ipcRenderer.invoke("courses:insert", course),
  selectCourses: () => ipcRenderer.invoke("courses:select"),
})

