const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  //file
  openFile: () => ipcRenderer.invoke("file:open"),
  createFile: (file) => ipcRenderer.invoke("file:create",file),
  saveFile: (data, name) =>ipcRenderer.invoke("file:save",data,name),
  exportPDF: () => ipcRenderer.invoke("export-pdf"),

  //databse
  insertCourse: (course) => ipcRenderer.invoke("courses:insert", course),
  selectCourses: () => ipcRenderer.invoke("courses:select"),
})

