import { Course } from "@/interface/interface";
import { useCourses } from "@/lib/context/CoursesContext";
import { useFiles } from "@/lib/context/NotesContext";

import {
  BookOpen,
  GraduationCap,
  UserRound,
  CalendarDays,
  FileText,
  Pencil,
  ArrowLeft,
  NotebookPen,
} from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import DelateAlert from "./DelateAlert";
import UpdateCourseAlert from "./UpdateCourseAlert";

export function HomepageInfoCourse({ course }: { course: Course }) {
  const navigate = useNavigate();
  const [showDelateAlert, setShowDelateAlert] = useState(false);
  const [showUpdteAlert, setShowUpdateAlert] = useState(false);

  const { delateCourse, updateColor, updateCourse } = useCourses();
  const { removeFilesByCourse } = useFiles();

  const isQuickNotes = course.id === "quick-notes";

  const handleDelateClick = () => {
    setShowDelateAlert(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDelateAlert(false);

    const result = await delateCourse(course.id);

    if (result?.changes > 0) {
      removeFilesByCourse(course.id);
      navigate("/corsi");
    }
  };

  const handleColorChange = async (e: any) => {
    const newColor = e.currentTarget.id;
    const courseId = e.currentTarget.dataset.ref;

    const result = await updateColor(courseId, newColor);
    console.log(result);
  };

  const handleNoteClick = () => {
    navigate(`/appunti/${encodeURIComponent(course.id)}`);
  };

  const handleUpdateClick = () => {
    setShowUpdateAlert(true);
  };

  const handleUpdateConfirm = async (data: any) =>{
    const result = await updateCourse(course.id,data);

     if (result?.changes > 0) {
      navigate(`/corsi/${encodeURIComponent(course.id)}`);
    }
  }
  
  return (
    <div className="min-h-full w-full overflow-y-auto bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-[#181818] dark:text-[#cccccc]">
      <div className="mx-auto max-w-5xl">
        {/* Torna ai corsi */}
        <button
          type="button"
          onClick={() => navigate("/corsi")}
          className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-[#9d9d9d] dark:hover:bg-[#2a2d2e] dark:hover:text-[#cccccc]"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Torna ai corsi</span>
        </button>

        {/* Header corso */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#303030] dark:bg-[#252526] dark:shadow-none">
          <div className="flex flex-col gap-6 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-[#303030]">
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white"
                style={{ backgroundColor: course.color }}
              >
                {isQuickNotes ? "NR" : course.code}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {isQuickNotes ? (
                    <NotebookPen className="h-5 w-5 shrink-0 text-indigo-600 dark:text-[#4daafc]" />
                  ) : (
                    <GraduationCap className="h-5 w-5 shrink-0 text-indigo-600 dark:text-[#4daafc]" />
                  )}

                  <span className="text-sm font-medium text-gray-500 dark:text-[#9d9d9d]">
                    {isQuickNotes ? "Spazio personale" : "Corso universitario"}
                  </span>
                </div>

                <h1 className="mt-1 truncate text-2xl font-bold text-gray-900 dark:text-[#cccccc]">
                  {course.name}
                </h1>

                {isQuickNotes ? (
                  <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
                    Il tuo spazio per le note personali
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
                    {course.code} · {course.year}° Anno | {course.semester}°
                    Semestre
                  </p>
                )}
              </div>
            </div>

            {/* Modifica corso solo per i corsi normali */}
            {!isQuickNotes && (
              <button
                onClick={handleUpdateClick}
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 dark:bg-[#007acc] dark:hover:bg-[#1a85c7]"
              >
                <Pencil className="h-4 w-4" />
                Modifica corso
              </button>
            )}
          </div>

          {/* Informazioni principali */}
          <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-[#303030]">
            {/* Professore / Tipo */}
            <div className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-[#264f78]">
                <UserRound className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-[#9d9d9d]">
                  {isQuickNotes ? "Tipo" : "Professore"}
                </p>

                <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-[#cccccc]">
                  {isQuickNotes ? "Note personali" : course.professor}
                </p>
              </div>
            </div>

            {/* CFU / Utilizzo */}
            <div className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-[#264f78]">
                <BookOpen className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-[#9d9d9d]">
                  {isQuickNotes ? "Utilizzo" : "Crediti formativi"}
                </p>

                <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-[#cccccc]">
                  {isQuickNotes ? "Personale" : `${course.cfu} CFU`}
                </p>
              </div>
            </div>

            {/* Semestre / Categoria */}
            <div className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-[#264f78]">
                <CalendarDays className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-[#9d9d9d]">
                  {isQuickNotes ? "Categoria" : "Semestre"}
                </p>

                <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-[#cccccc]">
                  {isQuickNotes
                    ? "Appunti veloci"
                    : `${course.semester}° semestre`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenuto */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Informazioni corso */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-[#303030] dark:bg-[#252526]">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />

                <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
                  {isQuickNotes ? "Informazioni" : "Informazioni sul corso"}
                </h2>
              </div>

              <div className="mt-5">
                <p className="text-sm leading-7 text-gray-600 dark:text-[#9d9d9d]">
                  {isQuickNotes
                    ? "Questo è il tuo spazio personale per creare e organizzare rapidamente appunti che non appartengono a un corso specifico."
                    : course.description ||
                      "Nessuna descrizione disponibile per questo corso."}
                </p>
              </div>

              {/* Colore solo corsi normali */}
              {!isQuickNotes && (
                <div className="mt-6 border-t border-gray-100 pt-5 dark:border-[#303030]">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-[#cccccc]">
                    Colore corso
                  </h3>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {[
                      "#6366f1", // Indaco
                      "#3b82f6", // Blu
                      "#06b6d4", // Ciano
                      "#10b981", // Verde
                      "#84cc16", // Lime
                      "#eab308", // Giallo
                      "#f59e0b", // Ambra
                      "#f97316", // Arancio
                      "#ef4444", // Rosso
                      "#ec4899", // Rosa
                      "#a855f7", // Viola
                      "#64748b", // Ardesia
                    ].map((color) => (
                      <button
                        key={color}
                        type="button"
                        id={color}
                        data-ref={course.id}
                        className={`h-10 w-10 rounded-lg border-2 border-white shadow-sm transition hover:scale-110 dark:border-[#252526] ${
                          course.color === color
                            ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-[#252526]"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={handleColorChange}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Appunti */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-[#303030] dark:bg-[#252526]">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />

              <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
                I tuoi appunti
              </h2>
            </div>
            <div className="mt-6">
              <p className="text-4xl font-bold text-gray-900 dark:text-[#cccccc]">
                {course.notes_count}
              </p>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
                {course.notes_count === 0
                  ? "Nessun appunto salvato"
                  : course.notes_count === 1
                    ? "appunto salvato"
                    : "appunti salvati"}
              </p>
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:hover:bg-[#2a2d2e]"
              onClick={handleNoteClick}
            >
              <FileText className="h-4 w-4" />
              Visualizza appunti
            </button>
          </div>
        </div>

        {/* ID corso */}
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-[#303030] dark:bg-[#252526]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
                {isQuickNotes ? "ID spazio" : "ID corso"}
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
                {isQuickNotes
                  ? "Identificativo dello spazio personale"
                  : "Identificativo univoco del corso"}
              </p>
            </div>

            <span className="max-w-[50%] truncate rounded-md bg-gray-100 px-3 py-1.5 font-mono text-xs text-gray-700 dark:bg-[#1e1e1e] dark:text-[#9d9d9d]">
              {course.id}
            </span>
          </div>
        </div>

        {/* Zona pericolosa solo corsi normali */}
        {!isQuickNotes && (
          <div className="mt-5 rounded-xl border border-red-200 bg-white p-6 dark:border-[#5a2a2a] dark:bg-[#252526]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-red-600 dark:text-[#f48771]">
                  Zona pericolosa
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
                  Eliminando il corso verranno rimossi anche i dati associati.
                </p>
              </div>

              <button
                onClick={handleDelateClick}
                type="button"
                className="shrink-0 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-[#5a2a2a] dark:bg-[#3a1f1f] dark:text-[#f48771] dark:hover:bg-[#4a2525]"
              >
                Elimina corso
              </button>
            </div>
          </div>
        )}
      </div>
      {showDelateAlert && (
        <DelateAlert
          open={showDelateAlert}
          coursename={course.name}
          onClose={() => setShowDelateAlert(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {showUpdteAlert && (
        <UpdateCourseAlert
          open={showUpdteAlert}
          course={course}
          onClose={() => setShowUpdateAlert(false)}
          onConfirm={async (data) => {
            handleUpdateConfirm(data);
            setShowUpdateAlert(false);
          }}
        />
      )}
    </div>
  );
}
