import { FileData } from "@/interface/interface";
import { Editor } from "@tiptap/react";

interface SaveFilePickerOptions {
  suggestedName?: string;
  types?: Array<{
    description?: string;
    accept?: Record<string, string[]>;
  }>;
}

interface OpenFilePickerOptions {
  multiple?: boolean;
  types?: Array<{
    description?: string;
    accept?: Record<string, string[]>;
  }>;
}

interface ElectronApi {
  exportPDF?: () => void | Promise<void>;
}
declare global {
  interface Window {
    electronAPI?: ElectronApi;
    showSaveFilePicker?: (
      options?: SaveFilePickerOptions,
    ) => Promise<FileSystemFileHandle>;
    showOpenFilePicker?: (
      options?: OpenFilePickerOptions,
    ) => Promise<FileSystemFileHandle[]>;
  }
}

class CustomFileManager {
  private editor: Editor | null = null;
  private fileHandle: FileSystemFileHandle | null = null;
  private fileData!: FileData;

  setEditor(editor: Editor) {
    this.editor = editor;
  }

  async saveFileWithName(): Promise<void> {
    if (!this.editor) {
      console.error("Editor non impostato");
      return;
    }

    if (!window.showSaveFilePicker) {
      console.error("File System Access API non supportata");
      return;
    }

    try {
      const content = this.editor.getJSON();

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "documento.json",
        types: [
          {
            description: "Documento JSON",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
      });

      const writable = await fileHandle.createWritable();

      await writable.write(JSON.stringify(content, null, 2));

      await writable.close();

      console.log("Documento salvato!");
    } catch (error) {
      // L'utente ha premuto "Annulla"
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Salvataggio annullato");
        return;
      }

      console.error("Errore durante il salvataggio:", error);
    }
  }

  async openFile(): Promise<void> {
    if (!this.editor) {
      console.error("Editor non impostato");
      return;
    }

    if (!window.showOpenFilePicker) {
      throw new Error(
        "The File System Access API is not supported in this browser.",
      );
    }

    try {
      const [fileHandle] = await window.showOpenFilePicker({
        multiple: false,
        types: [
          {
            description: "File JSON",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
      });

      this.fileHandle = fileHandle;

      const file = await fileHandle.getFile();
      const text = await file.text();

      const content = JSON.parse(text);

      this.editor.commands.setContent(content);
      this.editor.commands.focus();

      console.log("Documento aperto:", file.name);

      this.setFileData(file.name, new Date(file.lastModified));
      console.log(this.getFileData());
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Apertura annullata");
        return;
      }

      console.error("Errore apertura file:", error);
      throw error;
    }
  }

  async saveFile(): Promise<void> {
    if (!this.fileHandle && !this.editor) return;

    const content = this.editor?.getJSON();
    const writable = await this.fileHandle?.createWritable();

    await writable?.write(JSON.stringify(content, null, 2));

    await writable?.close();
  }

  exportPDF() {
    // Funzione che permette di esportare in PDF
    if (!window.electronAPI?.exportPDF) {
      console.error("Export PDF non disponibile");
      return;
    }
    window.electronAPI.exportPDF();
  }

  private setFileData(name: string, lastEdit: Date) {
    this.fileData = {
      name: name,
      lastEdit: lastEdit,
    };
  }

  getFileData() {
    return this.fileData;
  }
}

const FileManager = new CustomFileManager();

export default FileManager;
