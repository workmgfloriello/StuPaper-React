import { ipcMain } from "electron";
import {
  delateCourseDB,
  insertCourse,
  selectCourses,
  updateCourse,
  updateCourseColor,
  updateNoteCount,
  updateRecent,
} from "../../database/ManageDatabase.ts";

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
  ipcMain.handle(
    "courses:updateRecent",
    (_, courseId: string, newRecent: boolean) => {
      return updateRecent(courseId, newRecent);
    },
  );

  //Elimina Corso e appunti collegati
  ipcMain.handle("courses:delate", async (__dirname, courseId: string) => {
    return delateCourseDB(courseId);
  });

  //Aggiorna colore
  ipcMain.handle(
    "courses:updateColor",
    (_, courseId: string, color: string) => {
      return updateCourseColor(courseId, color);
    },
  );

  //Aggiorna noteCount
  ipcMain.handle(
    "courses:updateNoteCount",
    (_, courseId: string, count: number) => {
      return updateNoteCount(courseId, count);
    },
  );

  //Aggiorna corso
  ipcMain.handle(
    "courses:update",
    (
      _,
      courseId,
      course: {
        name: string;
        professor: string;
        description: string;
        year: number;
        semester: number;
      },
    ) => {
      return updateCourse(courseId,course);
    },
  );
}
