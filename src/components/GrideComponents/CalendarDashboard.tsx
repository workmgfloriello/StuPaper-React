"use client";

import { DayPicker } from "react-day-picker";
import { it } from "date-fns/locale";
import "react-day-picker/style.css";

export default function CalendarDashboard() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-3">
        <h2 className="font-semibold text-gray-900">
          Calendario
        </h2>

        <p className="text-sm text-gray-500">
          Agosto 2026
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden w-full">
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