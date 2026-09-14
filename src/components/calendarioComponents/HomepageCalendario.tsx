"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import type { EventChangeArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function HomepageCalendario() {
  const [darkMode, setDarkMode] = useState(false);

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Riunione",
      start: "2026-09-15T10:00:00",
      end: "2026-09-15T11:00:00",
    },
    {
      id: "2",
      title: "Pranzo",
      start: "2026-09-16T13:00:00",
      end: "2026-09-16T14:00:00",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    date: "",
    startTime: "09:00",
    endTime: "10:00",
    description: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEvent = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!form.title || !form.date) return;

    const newEvent = {
      id: crypto.randomUUID(),
      title: form.title,
      start: `${form.date}T${form.startTime}`,
      end: `${form.date}T${form.endTime}`,
      extendedProps: {
        description: form.description,
      },
    };

    setEvents((prev) => [...prev, newEvent]);

    setForm({
      title: "",
      date: "",
      startTime: "09:00",
      endTime: "10:00",
      description: "",
    });
  };

  const handleDateClick = (info: { dateStr: string; }) => {
    setForm((prev) => ({
      ...prev,
      date: info.dateStr.substring(0, 10),
    }));
  };

  const handleEventClick = (info: EventClickArg) => {
    const description = info.event.extendedProps.description;

    alert(
      `${info.event.title}${description ? `\n\n${description}` : ""}`
    );
  };

  const handleEventChange = (info: EventChangeArg) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start?.toISOString() ?? "",
      end: info.event.end?.toISOString() ?? "",
      extendedProps: info.event.extendedProps,
    };

    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleEventRemove = (info: { event: { id: string; }; }) => {
    setEvents((prev) =>
      prev.filter((event) => event.id !== info.event.id)
    );
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8">
        {/* HEADER */}
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <span
              className={`inline-flex rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-widest ${
                darkMode
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              CALENDARIO
            </span>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Il mio calendario
            </h1>

            <p
              className={`mt-2 text-sm ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Organizza appuntamenti, attività ed eventi.
            </p>
          </div>

          {/* DARK MODE */}
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
              darkMode
                ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-indigo-500 hover:text-indigo-400"
                : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-indigo-400 hover:text-indigo-600"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* CONTENT */}
        <section className="grid items-start gap-6 lg:grid-cols-[310px_minmax(0,1fr)]">
          {/* FORM */}
          <aside
            className={`rounded-2xl border p-5 transition-colors ${
              darkMode
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-indigo-500">
                  NUOVO EVENTO
                </span>

                <h2 className="mt-1 text-lg font-bold">
                  Aggiungi evento
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                +
              </div>
            </div>

            <form onSubmit={addEvent} className="space-y-4">
              {/* TITOLO */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-1.5 block text-xs font-semibold"
                >
                  Titolo
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Es. Riunione con cliente"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                    darkMode
                      ? "border-slate-700 bg-slate-800 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-900"
                  }`}
                />
              </div>

              {/* DATA */}
              <div>
                <label
                  htmlFor="date"
                  className="mb-1.5 block text-xs font-semibold"
                >
                  Data
                </label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                    darkMode
                      ? "border-slate-700 bg-slate-800 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-900"
                  }`}
                />
              </div>

              {/* ORARI */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="startTime"
                    className="mb-1.5 block text-xs font-semibold"
                  >
                    Inizio
                  </label>

                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={form.startTime}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                      darkMode
                        ? "border-slate-700 bg-slate-800 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="endTime"
                    className="mb-1.5 block text-xs font-semibold"
                  >
                    Fine
                  </label>

                  <input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={form.endTime}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                      darkMode
                        ? "border-slate-700 bg-slate-800 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              {/* DESCRIZIONE */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-xs font-semibold"
                >
                  Descrizione
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Aggiungi una descrizione..."
                  value={form.description}
                  onChange={handleChange}
                  className={`w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                    darkMode
                      ? "border-slate-700 bg-slate-800 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-900"
                  }`}
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                <span className="text-lg leading-none">+</span>
                Aggiungi evento
              </button>
            </form>
          </aside>

          {/* CALENDARIO */}
          <section
            className={`overflow-hidden rounded-2xl border p-4 sm:p-5 ${
              darkMode
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
              initialView="dayGridMonth"
              locale="it"
              firstDay={1}
              editable={true}
              selectable={true}
              navLinks={true}
              nowIndicator={true}
              height="auto"
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              eventChange={handleEventChange}
              eventRemove={handleEventRemove}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              buttonText={{
                today: "Oggi",
                month: "Mese",
                week: "Settimana",
                day: "Giorno",
              }}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
            />
          </section>
        </section>
      </div>
    </main>
  );
}