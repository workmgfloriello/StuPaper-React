import { app, BrowserWindow, Menu } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";
import { getDatabase, setDatabase } from "../database/ManageDatabase.ts";
import { registerIpcHandlers } from "./ipc/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;

let win: BrowserWindow;
let logoPath = path.join(__dirname, '../public/assets/logo.ico');
const documentsPath = path.join(app.getPath("userData"), "documents");
const basePath = path.join(app.getPath("userData"));
const databasePath = path.join(app.getPath("userData"), "stupaperBAse.db");

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    frame: false,
    icon: logoPath,
    title: "StuPaper",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  Menu.setApplicationMenu(null);

  win.webContents.openDevTools();

  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "../out/index.html"));
  }
}
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });



  fs.mkdirSync(documentsPath, {
    recursive: true,
  });

  createDatabase();
  


  registerIpcHandlers(win, documentsPath);
  console.log("Documents:", documentsPath);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

async function createDatabase() {
  if (!fs.existsSync(databasePath)) {
    fs.writeFileSync(
      databasePath,
      "",
      "utf-8")
  }

  setDatabase(databasePath);

}

