import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";
import { getDatabase,insertCourse,selectCourses } from "../database/ManageDatabase.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,

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

// EXPORT PDF
ipcMain.handle("export-pdf", async () => {
  if (!win) {
    throw new Error("Finestra principale non disponibile");
  }

  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    title: "Esporta PDF",
    defaultPath: "documento.pdf",
    filters: [
      {
        name: "PDF",
        extensions: ["pdf"],
      },
    ],
  });

  if (canceled || !filePath) {
    return {
      canceled: true,
    };
  }

  const pdf = await win.webContents.printToPDF({
    pageSize: "A4",
    printBackground: true,
  });

  fs.writeFileSync(filePath, pdf);

  return {
    canceled: false,
    filePath,
  };
});

//Insert al DB
ipcMain.handle("courses:insert", (_, course) => {
  return insertCourse(course);
});
//Select al DB
ipcMain.handle("courses:select", () => {
  return selectCourses();
});
app.whenReady().then(() => {
  createWindow();
  getDatabase();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  const documentsPath = path.join(
    app.getPath("userData"),
    "documents"
  );

  fs.mkdirSync(documentsPath, {
    recursive: true,
  });

  // JSON di prova
  const testFilePath = path.join(
    documentsPath,
    "test.json"
  );

  if (!fs.existsSync(testFilePath)) {
    fs.writeFileSync(
      testFilePath,
      JSON.stringify(
        {
          id: "test-123",
          name: "Documento di prova",
          content:
            "<h1>Ciao StuPaper</h1><p>Test riuscito!</p>",
        },
        null,
        2
      )
    );
  }

  console.log("Documents:", documentsPath);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

