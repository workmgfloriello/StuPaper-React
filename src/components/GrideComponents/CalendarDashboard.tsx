"use client";

import { DayPicker } from "react-day-picker";
import { it } from "date-fns/locale";
import "react-day-picker/style.css";

export default function CalendarDashboard() {
return (
  <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-300 bg-white p-5 transition-colors dark:border-[#303030] dark:bg-[#252526]">
    <div className="mb-3">
      <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
        Calendario
      </h2>

      <p className="text-sm text-gray-500 dark:text-[#9d9d9d]">
        Agosto 2026
      </p>
    </div>

    <div className="min-h-0 w-full flex-1 overflow-hidden">
      <DayPicker
        mode="single"
        locale={it}
        defaultMonth={new Date(2026, 7)}
        disabled
        showOutsideDays
      />
    </div>
  </div>
);
}