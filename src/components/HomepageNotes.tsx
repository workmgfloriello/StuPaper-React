"use client";
import { useCourses } from "@/lib/context/CoursesContext";
import { useNotes } from "@/lib/context/NotesContext.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomepageNotes() {
  const { notes } = useNotes();
  const { courses } = useCourses();

  const [selectedCourse, setSelectedCourse] = useState("all");
  const [textCourse, setTextCourse] = useState("");

  const handleSelectChange = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    setSelectedCourse(e.target.value);
  };

  const handleTextChange = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    setTextCourse(e.target.value);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">I miei appunti</h1>

          <p className="mt-2 text-sm text-gray-500">
            Tutti i tuoi appunti organizzati per corso.
          </p>
        </div>

        {/* Search / filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Cerca un appunto..."
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400"
            onChange={handleTextChange}
          />

          <select
            className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none"
            onChange={handleSelectChange}
          >
            <option value={"all"}>Tutti i corsi</option>
            {courses.map((course) => (
              <option value={course.id} key={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <Link
            to="/newappunti"
            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            + Crea appunto
          </Link>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          {notes.map((note) => {
            // Filtro select corso
            if (selectedCourse !== "all" && note.course !== selectedCourse) {
              return false;
            }

            // Filtro barra di ricerca
            if (
              textCourse !== "" &&
              !note.name.toLowerCase().includes(textCourse.toLowerCase())
            ) {
              return false;
            }

            let color = "";
            const findColor = courses.find(
              (course) => note.course == course.id,
            );
            if (findColor?.color) {
              color = findColor.color;
            } else {
              color = "bg-indigo-50 text-indigo-600";
            }

            return (
              <div
                key={note.id}
                className="group flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:shadow-sm"
              >
                <div className="flex min-w-0 items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${color}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-8.5a2.25 2.25 0 0 0-2.25-2.25h-10.5A2.25 2.25 0 0 0 4.5 5.75v12.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-1.5m-9-7.5h6m-6 3h6"
                      />
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-gray-900">
                      {note.name}
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span>{note.course}</span>

                      <span className="text-gray-300">•</span>

                      <span>
                        {note.data.toLocaleDateString("it-IT", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="ml-4 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 18 6-6-6-6"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {notes.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <h2 className="font-semibold text-gray-800">Nessun appunto</h2>

            <p className="mt-1 text-sm text-gray-500">
              Non hai ancora creato nessun appunto.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
