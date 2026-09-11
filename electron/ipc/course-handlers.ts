import { ipcMain } from "electron";
import { insertCourse, selectCourses, updateRecent } from "../../database/ManageDatabase.ts";

export function registerCourseHandlers() {
  //Insert al DB
  ipcMain.handle("courses:insert", (_, course) => {
    return insertCourse(course);
  });

  //Select al DB
  ipcMain.handle("courses:select", () => {
    return selectCourses();
  });

  //Update Recente
  ipcMain.handle("courses:updateRecent", (_, courseId: string, newRecent:boolean) =>{
    return updateRecent(courseId,newRecent);
  })
}
