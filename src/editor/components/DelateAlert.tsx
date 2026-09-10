import { AlertTriangle, Trash2, X } from "lucide-react";

interface DelateAlertProps {
  open: boolean;
  fileName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DelateAlert({ open, fileName, onClose, onConfirm }: DelateAlertProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm dark:bg-black/60">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-[#3c3c3c] dark:bg-[#252526]">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-[#3c3c3c]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 dark:bg-[#3a2020]">
              <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-[#cccccc]">
              Elimina file
            </h2>
          </div>

          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-[#9d9d9d] dark:hover:bg-[#2a2d2e] dark:hover:text-[#cccccc]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="text-sm leading-6 text-gray-600 dark:text-[#9d9d9d]">
            Sei sicuro di voler eliminare definitivamente questo file?
          </p>

          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-[#3c3c3c] dark:bg-[#1e1e1e]">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-[#cccccc]">
              {fileName}
            </p>
          </div>

          <p className="mt-3 text-xs text-red-500 dark:text-red-400">
            Questa operazione non può essere annullata.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-[#3c3c3c] dark:bg-[#1e1e1e]">
          <button type="button" onClick={onClose} className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-[#3c3c3c] dark:bg-[#252526] dark:text-[#cccccc] dark:hover:bg-[#2a2d2e]">
            Annulla
          </button>

          <button type="button" onClick={onConfirm} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700">
            <Trash2 className="h-4 w-4" />
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
}