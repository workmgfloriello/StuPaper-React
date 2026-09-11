import { BrowserWindow } from "electron";
import { registerCourseHandlers } from "./course-handlers.ts";
import { registerFileHandlers } from "./file-handlers.ts";
import { registerWindowHandlers } from "./window-handlers.ts";

export function registerIpcHandlers(win: BrowserWindow, dirPath: string) {
  registerWindowHandlers(win);
  registerCourseHandlers(dirPath);
  registerFileHandlers(win, dirPath);
}
