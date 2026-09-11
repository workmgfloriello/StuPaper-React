import { Pencil, X } from "lucide-react";

interface RenameAlertProps {
  open: boolean;
  fileName: string;
  onClose: () => void;
  onConfirm: (newName: string) => void;
}

export default function RenameAlert({ open, fileName, onClose, onConfirm }: RenameAlertProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newName = String(formData.get("newName") || "").trim();

    if (!newName || newName === fileName) return;

    onConfirm(newName);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm dark:bg-black/60">
      <form onSubmit={handleSubmit} className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-[#3c3c3c] dark:bg-[#252526]">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-[#3c3c3c]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-[#264f78]">
              <Pencil className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
            </div>

            <h2 className="text-base font-semibold text-gray-900 dark:text-[#cccccc]">
              Rinomina file
            </h2>
          </div>

          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-[#9d9d9d] dark:hover:bg-[#2a2d2e] dark:hover:text-[#cccccc]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="text-sm leading-6 text-gray-600 dark:text-[#9d9d9d]">
            Inserisci il nuovo nome del documento.
          </p>

          <div className="mt-4">
            <label htmlFor="newName" className="mb-2 block text-xs font-medium text-gray-600 dark:text-[#9d9d9d]">
              Nome file
            </label>

            <input id="newName" name="newName" type="text" defaultValue={fileName} autoFocus className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:placeholder:text-[#6e6e6e] dark:focus:border-[#007acc]" />
          </div>

          <p className="mt-3 text-xs text-gray-400 dark:text-[#6e6e6e]">
            L'estensione <span className="font-mono">.json</span> verrà aggiunta automaticamente.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-[#3c3c3c] dark:bg-[#1e1e1e]">
          <button type="button" onClick={onClose} className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-[#3c3c3c] dark:bg-[#252526] dark:text-[#cccccc] dark:hover:bg-[#2a2d2e]">
            Annulla
          </button>

          <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-[#007acc] dark:hover:bg-[#1a85c7]">
            <Pencil className="h-4 w-4" />
            Rinomina
          </button>
        </div>
      </form>
    </div>
  );
}