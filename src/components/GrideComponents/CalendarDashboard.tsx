import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import itLocale from "@fullcalendar/core/locales/it";

export default function CalendarDashboard() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white p-3 transition-colors dark:border-[#303030] dark:bg-[#252526]">
      
      {/* Header */}
      <div className="mb-2 shrink-0">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-[#cccccc]">
          Calendario
        </h2>

        <p className="text-[11px] text-gray-500 dark:text-[#888888]">
          Appuntamenti ed eventi
        </p>
      </div>

      {/* Calendar */}
      <div className="calendar-dashboard min-h-0 flex-1 overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={itLocale}
          firstDay={1}
          height="100%"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "",
          }}
          fixedWeekCount={false}
          showNonCurrentDates={true}
          dayMaxEvents={1}
          events={[
            {
              title: "Esame Analisi 1",
              date: "2026-09-15",
            },
            {
              title: "Consegna progetto",
              date: "2026-09-18",
            },
            {
              title: "Appello Fisica",
              date: "2026-09-22",
            },
          ]}
        />
      </div>
    </div>
  );
}