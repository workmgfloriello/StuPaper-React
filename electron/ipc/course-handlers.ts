import { ipcMain } from "electron";
import {delateCourseDB, insertCourse, selectCourses, updateRecent } from "../../database/ManageDatabase.ts";

export function registerCourseHandlers(dirPath: string) {
  //Insert al DB
  ipcMain.handle("courses:insert", (_, course) => {
    return insertCourse(course);
  });

  //Select al DB
  ipcMain.handle("courses:select", () => {
    return selectCourses();
  });

  //Update Recente
  ipcMain.handle("courses:updateRecent", (_, courseId: string, newRecent: boolean) => {
    return updateRecent(courseId, newRecent);
  })

  //Elimina Corso e appunti collegati
  ipcMain.handle("courses:delate", async (__dirname, courseId: string) => {
    return delateCourseDB(courseId);
  })
}
