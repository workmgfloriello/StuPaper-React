import { File } from "@/interface/interface";
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
  openFile?: () => any;
  saveFile? : (data: any, name: any)=> any;
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
  private fileData: { name: string; data: any; } | undefined;

  setEditor(editor: Editor) {
    this.editor = editor;
  }

  async openFile() {
    if (!this.editor) {
      console.error("Editor non impostato");
      return;
    }

    const openFile = window.electronAPI?.openFile;
    if (!openFile) {
      console.error("Apertura file non disponibile");
      return;
    }

    const file = await openFile();
    const jsonFile = JSON.parse(file)
    this.editor.commands.setContent(jsonFile);

    //salvo info importanti per salvare file dopo
    this.setFileData(jsonFile.metadata.name,jsonFile); 
  }

  async saveFile() {
    if (!this.editor) {
      console.error("Editor non impostato");
      return;
    }

    const saveFile = window.electronAPI?.saveFile;
    if(!saveFile){
       console.error("Salvataggio file non disponibile");
      return;
    }

    const content = this.getEditorContentJSON();
    const fileData = this.getFileData();
    if (!fileData) return;
    const { name, data } = fileData;

    const save = await saveFile(content,name);
    console.log(save);
  }

  exportPDF() {
    // Funzione che permette di esportare in PDF
    if (!window.electronAPI?.exportPDF) {
      console.error("Export PDF non disponibile");
      return;
    }
    window.electronAPI.exportPDF();
  }

  getFileData() {
    return this.fileData;
  } 

  private setFileData(name: string, data:any) {
    this.fileData = { name, data };
  }

  private getEditorContentJSON(){
    if(!this.editor) return;
    return this.editor.getJSON().content;
  }

  closeFile(){
    this.fileData = undefined
  }
}

const FileManager = new CustomFileManager();

export default FileManager;
