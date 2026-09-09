import { ipcMain } from "electron";
import { insertCourse, selectCourses } from "../../database/ManageDatabase.ts";

export function registerDatabaseHandlers() {
  //Insert al DB
  ipcMain.handle("courses:insert", (_, course) => {
    return insertCourse(course);
  });

  //Select al DB
  ipcMain.handle("courses:select", () => {
    return selectCourses();
  });
}
