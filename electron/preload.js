const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  exportPDF: () => ipcRenderer.invoke("export-pdf"),
  insertCourse: (course) => ipcRenderer.invoke("courses:insert", course),
  selectCourses: () => ipcRenderer.invoke("courses:select"),
})

