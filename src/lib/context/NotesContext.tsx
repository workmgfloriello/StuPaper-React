"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { File } from "@/interface/interface";
import FileManager from "../../editor/extension/FileManager";

type FilesContextType = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  deleteFile: (fileName: string) => Promise<any>;
};

const FilesContext = createContext<FilesContextType | null>(null);

export function FilesProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function loadFiles() {
      try {
        const electronAPI = window.electronAPI as
          | (typeof window.electronAPI & {
              selectFile?: () => Promise<File[]>;
            })
          | undefined;

        if (!electronAPI?.selectFile) {
          return;
        }

        const loadedFiles = await electronAPI.selectFile();

        setFiles(loadedFiles);
      } catch (error) {
        console.error("Errore caricamento File:", error);
      }
    }

    loadFiles();
  }, []);

  async function deleteFile(fileName: string) {
    const result = await FileManager.delateFile(fileName);

    if (result?.success) {
      setFiles((currentFiles) =>
        currentFiles.filter((file) => file.name !== fileName)
      );
    }

    return result;
  }

  return (
    <FilesContext.Provider value={{ files, setFiles, deleteFile }}>
      {children}
    </FilesContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FilesContext);

  if (!context) {
    throw new Error("useFiles must be used within a FilesProvider");
  }

  return context;
}