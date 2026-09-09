import { BrowserWindow } from "electron";
import { registerDatabaseHandlers } from "./database-handlers.ts";
import { registerFileHandlers } from "./file-handlers.ts";

export function registerIpcHandlers(win: BrowserWindow, dirPath:string) {
  registerDatabaseHandlers()
  registerFileHandlers(win, dirPath)
}