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

type FilesContextType = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
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

  return (
    <FilesContext.Provider value={{ files, setFiles }}>
      {children}
    </FilesContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FilesContext);

  if (!context) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }

  return context;
}
