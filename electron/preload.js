const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  //window
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),

  //file
  openFile: (fileName) => ipcRenderer.invoke("file:open", fileName),
  createFile: (file) => ipcRenderer.invoke("file:create", file),
  saveFile: (data, name) => ipcRenderer.invoke("file:save", data, name),
  exportPDF: () => ipcRenderer.invoke("export-pdf"),
  selectFile: () => ipcRenderer.invoke("file:select"),
  delateFile: (fileName) => ipcRenderer.invoke("file:delate",fileName),
  renameFile: (fileName,newName) => ipcRenderer.invoke("file:rename",fileName,newName),
  
  //course
  insertCourse: (course) => ipcRenderer.invoke("courses:insert", course),
  selectCourses: () => ipcRenderer.invoke("courses:select"),
  updateRecent: (courseId,newRecent) => ipcRenderer.invoke("courses:updateRecent", courseId,newRecent),
});
