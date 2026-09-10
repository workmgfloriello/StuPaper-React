"use client";
import { useCourses } from "@/lib/context/CoursesContext";
import { useFiles } from "@/lib/context/NotesContext";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomepageNotes() {
  const { files } = useFiles();
  const { courses } = useCourses();

  const [selectedCourse, setSelectedCourse] = useState("all");
  const [textCourse, setTextCourse] = useState("");

  const navigate = useNavigate();
  
  const handleSelectChange = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    setSelectedCourse(e.target.value);
  };

  const handleTextChange = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    setTextCourse(e.target.value);
  };
  console.log(files);

  const handleOpenClick = (name:string) => {
    if(name){
      navigate(`/editor/${encodeURIComponent(name)}`);
    }
  };

  return (
    <main className="min-h-full bg-gray-50 px-6 py-8 text-gray-900 transition-colors dark:bg-[#181818] dark:text-[#cccccc]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-[#cccccc]">
            I miei appunti
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-[#9d9d9d]">
            Tutti i tuoi appunti organizzati per corso.
          </p>
        </div>

        {/* Search / filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Cerca un appunto..."
            className="
            flex-1
            rounded-lg
            border border-gray-200
            bg-white
            px-4 py-3
            text-sm text-gray-900
            outline-none
            transition
            placeholder:text-gray-400
            focus:border-gray-400

            dark:border-[#3c3c3c]
            dark:bg-[#1e1e1e]
            dark:text-[#cccccc]
            dark:placeholder:text-[#6e6e6e]
            dark:focus:border-[#007acc]
          "
            onChange={handleTextChange}
          />

          <select
            className="
            rounded-lg
            border border-gray-200
            bg-white
            px-4 py-3
            text-sm text-gray-600
            outline-none
            transition

            dark:border-[#3c3c3c]
            dark:bg-[#1e1e1e]
            dark:text-[#cccccc]
            dark:focus:border-[#007acc]
          "
            onChange={handleSelectChange}
          >
            <option value="all">Tutti i corsi</option>

            {courses.map((course) => (
              <option value={course.id} key={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <Link
            to="/newappunti"
            className="
            rounded-lg
            bg-black
            px-5 py-3
            text-sm font-medium text-white
            transition
            hover:bg-gray-800

            dark:bg-[#007acc]
            dark:hover:bg-[#1a85c7]
          "
          >
            + Crea appunto
          </Link>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          {files.map((note) => {
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
              (course) => course.id == note.course,
            );

            if (findColor?.color) {
              color = findColor.color;
            } else {
              color = "#6366f1";
            }

            return (
              <div
                key={note.id}
                className="
                group
                flex cursor-pointer
                items-center justify-between
                rounded-xl
                border border-gray-200
                bg-white
                p-5
                transition

                hover:border-gray-300
                hover:shadow-sm

                dark:border-[#303030]
                dark:bg-[#252526]
                dark:hover:border-[#454545]
                dark:hover:bg-[#2a2d2e]
              "
                
                onClick={(event) => handleOpenClick(note.name)}
              >
                {/* Icon */}
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-lg
                    text-white
                  "
                    style={{ backgroundColor: color }}
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
                    <h2 className="truncate font-semibold text-gray-900 dark:text-[#cccccc]">
                      {note.name}
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-[#9d9d9d]">
                      <span>{note.course}</span>

                      <span className="text-gray-300 dark:text-[#454545]">
                        •
                      </span>

                      <span>
                        {note.created_at
                          ? new Date(note.created_at).toLocaleDateString(
                              "it-IT",
                            )
                          : "Nessuna data"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                {/* Arrow */}
                <div className="ml-4 flex shrink-0 items-center gap-1 text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-500 dark:text-[#6e6e6e] dark:group-hover:text-[#cccccc]">
                  <span className="text-xs font-medium">Apri</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {files.length === 0 && (
          <div
            className="
            rounded-xl
            border border-dashed border-gray-300
            bg-white
            py-16
            text-center
            transition-colors

            dark:border-[#3c3c3c]
            dark:bg-[#252526]
          "
          >
            <h2 className="font-semibold text-gray-800 dark:text-[#cccccc]">
              Nessun appunto
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
              Non hai ancora creato nessun appunto.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
