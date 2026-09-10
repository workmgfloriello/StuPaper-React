import { CalendarX } from "lucide-react";

export default function Deadlines() {
  return (
  <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-white transition-colors dark:border-[#303030] dark:bg-[#252526]">
    {/* Header */}
    <div className="flex shrink-0 items-center gap-2 px-8 py-5">
      <CalendarX className="h-5 w-5 text-red-700 dark:text-red-400" />

      <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
        Ultimi appunti
      </h2>
    </div>

    <div className="custom-scrollbar flex flex-col justify-center gap-4 overflow-y-auto px-4">
      <div className="flex items-center gap-3 rounded-lg border-0 bg-gray-200 px-4 py-3 dark:bg-[#2a2d2e]">
        <div className="h-full w-1 rounded-full bg-red-500" />
        <div className="flex flex-col">
          <p className="font-medium text-gray-900 dark:text-[#cccccc]">
            Consegna Progetto Info
          </p>
          <p className="text-sm text-gray-500 dark:text-[#9d9d9d]">
            Oggi alle 15:30
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border-0 bg-gray-200 px-4 py-3 dark:bg-[#2a2d2e]">
        <div className="h-full w-1 rounded-full bg-orange-500" />
        <div className="flex flex-col">
          <p className="font-medium text-gray-900 dark:text-[#cccccc]">
            Iscrizione Appello Fisica
          </p>
          <p className="text-sm text-gray-500 dark:text-[#9d9d9d]">
            Tra 5 giorni
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border-0 bg-gray-200 px-4 py-3 dark:bg-[#2a2d2e]">
        <div className="h-full w-1 rounded-full bg-red-500" />
        <div className="flex flex-col">
          <p className="font-medium text-gray-900 dark:text-[#cccccc]">
            Consegna Progetto Info
          </p>
          <p className="text-sm text-gray-500 dark:text-[#9d9d9d]">
            Oggi alle 15:30
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border-0 bg-gray-200 px-4 py-3 dark:bg-[#2a2d2e]">
        <div className="h-full w-1 rounded-full bg-orange-500" />
        <div className="flex flex-col">
          <p className="font-medium text-gray-900 dark:text-[#cccccc]">
            Iscrizione Appello Fisica
          </p>
          <p className="text-sm text-gray-500 dark:text-[#9d9d9d]">
            Tra 5 giorni
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border-0 bg-gray-200 px-4 py-3 dark:bg-[#2a2d2e]">
        <div className="h-full w-1 rounded-full bg-red-500" />
        <div className="flex flex-col">
          <p className="font-medium text-gray-900 dark:text-[#cccccc]">
            Consegna Progetto Info
          </p>
          <p className="text-sm text-gray-500 dark:text-[#9d9d9d]">
            Oggi alle 15:30
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border-0 bg-gray-200 px-4 py-3 dark:bg-[#2a2d2e]">
        <div className="h-full w-1 rounded-full bg-orange-500" />
        <div className="flex flex-col">
          <p className="font-medium text-gray-900 dark:text-[#cccccc]">
            Iscrizione Appello Fisica
          </p>
          <p className="text-sm text-gray-500 dark:text-[#9d9d9d]">
            Tra 5 giorni
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border-0 bg-gray-200 px-4 py-3 dark:bg-[#2a2d2e]">
        <div className="h-full w-1 rounded-full bg-orange-500" />
        <div className="flex flex-col">
          <p className="font-medium text-gray-900 dark:text-[#cccccc]">
            Iscrizione Appello Fisica
          </p>
          <p className="text-sm text-gray-500 dark:text-[#9d9d9d]">
            Tra 5 giorni
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border-0 bg-gray-200 px-4 py-3 dark:bg-[#2a2d2e]">
        <div className="h-full w-1 rounded-full bg-orange-500" />
        <div className="flex flex-col">
          <p className="font-medium text-gray-900 dark:text-[#cccccc]">
            Iscrizione Appello Fisica
          </p>
          <p className="text-sm text-gray-500 dark:text-[#9d9d9d]">
            Tra 5 giorni
          </p>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="shrink-0 border-t border-gray-100 px-4 py-3 dark:border-[#303030]">
      <h2 className="cursor-pointer text-center text-sm font-medium text-indigo-600 transition hover:text-indigo-800 dark:text-[#4daafc] dark:hover:text-[#75beff]">
        Mostra tutti
      </h2>
    </div>
  </div>
);
}
