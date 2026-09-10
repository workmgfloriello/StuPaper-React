"use client";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { ChevronDown, Save, FolderOpen, Download } from "lucide-react";

import FileManager from "../extension/FileManager";

interface SaveBarProps {
  editor: Editor | null;
}

export default function SaveBar({ editor }: SaveBarProps) {
  const [open, setOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  
  //click fuori chiudo menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (open) {
        if (componentRef.current && !componentRef.current.contains(target)) {
          setOpen(false)
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  //AutoSafe
  useEffect(() => {
    if (!editor) return;

    let dirty = false;

    const handleUpdate = () => {
      dirty = true;
    };

    editor.on("update", handleUpdate);

    const interval = setInterval(async () => {
      if (!dirty) return;

      dirty = false;

      try {
        console.log("AUTOSAVE");
        await FileManager.saveFile();
        console.log("SALVATO");
      } catch (error) {
        console.error("Errore autosave:", error);
        dirty = true;
      }
    }, 2000);

    return () => {
      editor.off("update", handleUpdate);
      clearInterval(interval);
    };
  }, [editor]);

  const handleOpenClick = () => {
    console.log("APRO FILE");
    FileManager.openFile();
    setOpen(false);
  };

  const handleSaveClick = () => {
    console.log("SALVO CON NOME");
    FileManager.saveFile();
    setOpen(false);
  };

  const handleExportClick = () => {
    console.log("ESPORTO PDF");
    FileManager.exportPDF();
    setOpen(false);
  };
  return (
    <div className="relative" ref={componentRef}>
      {/* BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        disabled={!editor}
        className="
          inline-flex h-10 items-center gap-2 rounded-md
          bg-indigo-600 px-3 text-sm font-medium text-white
          transition-colors
          hover:bg-indigo-700
          active:bg-indigo-800
          focus:outline-none
          focus:ring-2 focus:ring-indigo-400
          focus:ring-offset-1
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <Save size={16} />

        <span>File</span>

        <ChevronDown
          size={15}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute right-0 z-50 mt-2 w-52
            overflow-hidden rounded-lg
            border border-gray-200
            bg-white
            p-1
            shadow-lg
          "
        >
          {/* SALVA */}
          <button
            type="button"
            onClick={handleSaveClick}
            className="
              flex w-full items-center gap-3
              rounded-md px-3 py-2.5
              text-sm text-gray-700
              transition-colors
              hover:bg-gray-100
            "
          >
            <Save size={17} />

            <div className="flex flex-col items-start">
              <span className="font-medium">Salva</span>

              <span className="text-xs text-gray-400">Salva come JSON</span>
            </div>
          </button>

          {/* APRI */}
          <button
            type="button"
            onClick={handleOpenClick}
            className="
              flex w-full items-center gap-3
              rounded-md px-3 py-2.5
              text-sm text-gray-700
              transition-colors
              hover:bg-gray-100
            "
          >
            <FolderOpen size={17} />

            <div className="flex flex-col items-start">
              <span className="font-medium">Apri file</span>

              <span className="text-xs text-gray-400">
                Apri un documento JSON
              </span>
            </div>
          </button>

          {/* SEPARATORE */}
          <div className="my-1 border-t border-gray-100" />

          {/* ESPORTA */}
          <button
            type="button"
            onClick={handleExportClick}
            className="
              flex w-full items-center gap-3
              rounded-md px-3 py-2.5
              text-sm text-gray-700
              transition-colors
              hover:bg-gray-100
            "
          >
            <Download size={17} />

            <div className="flex flex-col items-start">
              <span className="font-medium">Esporta</span>

              <span className="text-xs text-gray-400">Esporta come PDF</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
