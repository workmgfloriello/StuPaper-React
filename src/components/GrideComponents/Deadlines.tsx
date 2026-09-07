import { CalendarX } from "lucide-react";

export default function Deadlines() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 px-8 py-5">
        <CalendarX className="h-5 w-5 text-red-700" />

        <h2 className="font-semibold text-gray-900">Ultimi appunti</h2>
      </div>

      <div className="flex flex-col justify-center gap-4 px-4 custom-scrollbar overflow-y-auto">
        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg border-0">
          <div className="h-full w-1 rounded-full bg-red-500" />
          <div className="flex flex-col">
            <p className="font-medium">Consegna Progetto Info</p>
            <p className="text-sm">Oggi alle 15:30</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg border-0">
          <div className="h-full w-1 rounded-full bg-orange-500" />
          <div className="flex flex-col">
            <p className="font-medium">Iscrizione Appello Fisica</p>
            <p className="text-sm">Tra 5 giorni</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg border-0">
          <div className="h-full w-1 rounded-full bg-red-500" />
          <div className="flex flex-col">
            <p className="font-medium">Consegna Progetto Info</p>
            <p className="text-sm">Oggi alle 15:30</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg border-0">
          <div className="h-full w-1 rounded-full bg-orange-500" />
          <div className="flex flex-col">
            <p className="font-medium">Iscrizione Appello Fisica</p>
            <p className="text-sm">Tra 5 giorni</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg border-0">
          <div className="h-full w-1 rounded-full bg-red-500" />
          <div className="flex flex-col">
            <p className="font-medium">Consegna Progetto Info</p>
            <p className="text-sm">Oggi alle 15:30</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg border-0">
          <div className="h-full w-1 rounded-full bg-orange-500" />
          <div className="flex flex-col">
            <p className="font-medium">Iscrizione Appello Fisica</p>
            <p className="text-sm">Tra 5 giorni</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg border-0">
          <div className="h-full w-1 rounded-full bg-orange-500" />
          <div className="flex flex-col">
            <p className="font-medium">Iscrizione Appello Fisica</p>
            <p className="text-sm">Tra 5 giorni</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg border-0">
          <div className="h-full w-1 rounded-full bg-orange-500" />
          <div className="flex flex-col">
            <p className="font-medium">Iscrizione Appello Fisica</p>
            <p className="text-sm">Tra 5 giorni</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="shrink-0 border-t border-gray-100 px-4 py-3">
        <h2 className="cursor-pointer text-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
          Mostra tutti
        </h2>
      </div>
    </div>
  );
}
