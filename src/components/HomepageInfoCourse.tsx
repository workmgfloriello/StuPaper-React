import { Course } from "@/interface/interface";
import { useCourses } from "@/lib/context/CoursesContext";
import {
  BookOpen,
  GraduationCap,
  UserRound,
  CalendarDays,
  FileText,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HomepageInfoCourse({ course }: { course: Course }) {
  const navigate = useNavigate();
  const { delateCourse } = useCourses();

  const handleDelateClick = async () => {
    const result = await delateCourse(course.id);
    console.log(result)
    if (result?.changes== 1) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-full w-full overflow-y-auto bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-[#181818] dark:text-[#cccccc]">
      <div className="mx-auto max-w-5xl">
        <button type="button" onClick={() => navigate("/corsi")} className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-[#9d9d9d] dark:hover:bg-[#2a2d2e] dark:hover:text-[#cccccc]">
          <ArrowLeft className="h-5 w-5" />
          <span>Torna ai corsi</span>
        </button>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#303030] dark:bg-[#252526] dark:shadow-none">
          <div className="flex flex-col gap-6 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-[#303030]">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white" style={{ backgroundColor: course.color }}>
                {course.code}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 shrink-0 text-indigo-600 dark:text-[#4daafc]" />
                  <span className="text-sm font-medium text-gray-500 dark:text-[#9d9d9d]">
                    Corso universitario
                  </span>
                </div>

                <h1 className="mt-1 truncate text-2xl font-bold text-gray-900 dark:text-[#cccccc]">
                  {course.name}
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
                  {course.code} · {course.year}° Anno | {course.semester}° Semestre
                </p>
              </div>
            </div>

            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 dark:bg-[#007acc] dark:hover:bg-[#1a85c7]">
              <Pencil className="h-4 w-4" />
              Modifica corso
            </button>
          </div>

          <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-[#303030]">
            <div className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-[#264f78]">
                <UserRound className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-[#9d9d9d]">
                  Professore
                </p>
                <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-[#cccccc]">
                  {course.professor}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-[#264f78]">
                <BookOpen className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-[#9d9d9d]">
                  Crediti formativi
                </p>
                <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-[#cccccc]">
                  {course.cfu} CFU
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-[#264f78]">
                <CalendarDays className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-[#9d9d9d]">
                  Semestre
                </p>
                <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-[#cccccc]">
                  {course.semester}° semestre
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-[#303030] dark:bg-[#252526]">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
                <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
                  Informazioni sul corso
                </h2>
              </div>

              <div className="mt-5">
                <p className="text-sm leading-7 text-gray-600 dark:text-[#9d9d9d]">
                  {course.description || "Nessuna descrizione disponibile per questo corso."}
                </p>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5 dark:border-[#303030]">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-[#cccccc]">
                  Colore corso
                </h3>

                <div className="mt-4 flex items-center gap-3">
                  <button type="button" className="h-10 w-10 rounded-lg border-2 border-white shadow-sm ring-2 ring-indigo-500 transition hover:scale-105 dark:border-[#252526]" style={{ backgroundColor: course.color }} />

                  <button type="button" className="h-10 w-10 rounded-lg border-2 border-white bg-red-500 shadow-sm transition hover:scale-105 dark:border-[#252526]" />

                  <button type="button" className="h-10 w-10 rounded-lg border-2 border-white bg-emerald-500 shadow-sm transition hover:scale-105 dark:border-[#252526]" />

                  <button type="button" className="h-10 w-10 rounded-lg border-2 border-white bg-amber-500 shadow-sm transition hover:scale-105 dark:border-[#252526]" />

                  <button type="button" className="h-10 w-10 rounded-lg border-2 border-white bg-pink-500 shadow-sm transition hover:scale-105 dark:border-[#252526]" />

                  <button type="button" className="h-10 w-10 rounded-lg border-2 border-white bg-cyan-500 shadow-sm transition hover:scale-105 dark:border-[#252526]" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-[#303030] dark:bg-[#252526]">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
              <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
                I tuoi appunti
              </h2>
            </div>

            <div className="mt-6">
              <p className="text-4xl font-bold text-gray-900 dark:text-[#cccccc]">
                {course.notesCount}
              </p>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
                {course.notesCount === 1 ? "appunto salvato" : "appunti salvati"}
              </p>
            </div>

            <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:hover:bg-[#2a2d2e]">
              <FileText className="h-4 w-4" />
              Visualizza appunti
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-[#303030] dark:bg-[#252526]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
                Attività recenti
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
                Gli ultimi appunti modificati per questo corso
              </p>
            </div>

            <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-[#4daafc] dark:hover:text-[#75beff]">
              Mostra tutti
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-dashed border-gray-200 p-6 text-center dark:border-[#3c3c3c]">
            <FileText className="mx-auto h-8 w-8 text-gray-400 dark:text-[#6e6e6e]" />

            <p className="mt-2 text-sm text-gray-500 dark:text-[#9d9d9d]">
              Nessuna attività recente disponibile.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-[#303030] dark:bg-[#252526]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
                ID corso
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
                Identificativo univoco del corso
              </p>
            </div>

            <span className="max-w-[50%] truncate rounded-md bg-gray-100 px-3 py-1.5 font-mono text-xs text-gray-700 dark:bg-[#1e1e1e] dark:text-[#9d9d9d]">
              {course.id}
            </span>
          </div>
        </div>

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

            <button onClick={handleDelateClick} type="button" className="shrink-0 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-[#5a2a2a] dark:bg-[#3a1f1f] dark:text-[#f48771] dark:hover:bg-[#4a2525]">
              Elimina corso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

