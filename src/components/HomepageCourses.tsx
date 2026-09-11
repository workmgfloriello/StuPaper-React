"use client";
import { Course } from "@/interface/interface.tsx";
import { useCourses } from "@/lib/context/CoursesContext";
import { generateUUID } from "@/lib/utils/uuid";
import { useState } from "react";

export default function HomepageCourses() {
  const { courses, setCourses, updateRecent } = useCourses();

  const [showForm, setShowForm] = useState(false);

const [formData, setFormData] = useState<Course>({
  id: "",
  name: "",
  code: "",
  professor: "",
  cfu: 0,
  semester: 1,
  notesCount: 0,
  description: "",
  year: 1,
  recent: false,
  color: "#6366f1",
});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "cfu" || name === "semester" || name === "year"
          ? Number(value)
          : value,
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("SEMESTER FORM:", formData.semester);
  console.log("YEAR FORM:", formData.year);

  const newCourse: Course = {
    id: generateUUID().toString(),
    name: formData.name,
    code: formData.code,
    professor: formData.professor,
    cfu: Number(formData.cfu),
    semester: Number(formData.semester),
    notesCount: 0,
    description: formData.description,
    color: formData.color,
    recent: false,
    year: Number(formData.year),
  };

  console.log("NUOVO CORSO:", newCourse);

  try {
    const dbInsert = await (window.electronAPI as any)?.insertCourse(newCourse);

    console.log("RISPOSTA DATABASE:", dbInsert);

    if (dbInsert?.success === false) {
      console.error("Errore inserimento corso:", dbInsert);
      return;
    }

    setCourses((prev) => [...prev, newCourse]);

    setFormData({
      id: "",
      name: "",
      code: "",
      professor: "",
      cfu: 0,
      semester: 1,
      notesCount: 0,
      description: "",
      year: 1,
      recent: false,
      color: "#6366f1",
    });

    setShowForm(false);
  } catch (error) {
    console.error("Error inserting course:", error);
  }
};

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const courseId = e.currentTarget.id;

    const clickedCourse = courses.find((course) => course.id === courseId);

    if (!clickedCourse) return;

    if (clickedCourse.recent) {
      console.log("CORSO GIA IMPOSTATO COME RECENTE");
      return;
    }

    const recentCourses = courses.filter((course) => course.recent);

    if (recentCourses.length < 3) {
      await updateRecent(courseId, true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * recentCourses.length);
    const courseToRemove = recentCourses[randomIndex];

    await updateRecent(courseToRemove.id, false);
    await updateRecent(courseId, true);
  };

  return (
    <div className="min-h-full bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-[#181818] dark:text-[#cccccc]">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-[#cccccc]">
            I miei corsi
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-[#9d9d9d]">
            Gestisci i tuoi corsi universitari
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          {showForm ? "Chiudi" : "+ Nuovo corso"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-[#303030] dark:bg-[#252526]"
        >
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-[#cccccc]">
            Crea nuovo corso
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Nome */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                Nome corso
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Es. Analisi Matematica II"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:placeholder:text-[#6e6e6e]"
              />
            </div>

            {/* Codice */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                Codice
              </label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Es. AN2"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 uppercase text-gray-900 outline-none transition focus:border-indigo-500 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:placeholder:text-[#6e6e6e]"
              />
            </div>

            {/* Professore */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                Professore
              </label>

              <input
                type="text"
                name="professor"
                value={formData.professor}
                onChange={handleChange}
                placeholder="Es. Mario Rossi"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:placeholder:text-[#6e6e6e]"
              />
            </div>

            {/* CFU */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                CFU
              </label>

              <input
                type="number"
                name="cfu"
                value={formData.cfu}
                onChange={handleChange}
                placeholder="Es. 9"
                min="1"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:placeholder:text-[#6e6e6e]"
              />
            </div>

            {/* Semestre */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                Semestre
              </label>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc]"
              >
                <option value="1">1° semestre</option>
                <option value="2">2° semestre</option>
              </select>
            </div>

            {/* Anno */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                Anno
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc]"
              >
                <option value="1">1° Anno</option>
                <option value="2">2° Anno</option>
                <option value="3">3° Anno</option>
                <option value="4">4° Anno</option>
                <option value="5">5° Anno</option>
                <option value="6">6° Anno</option>
              </select>
            </div>

            {/* Descrizione */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                Descrizione
              </label>

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrizione del corso"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:placeholder:text-[#6e6e6e]"
              />
            </div>

            {/* Colore */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                Colore
              </label>

              <input
                type="color"
                name="color"
                value={formData.color || "#6366f1"}
                onChange={handleChange}
                required
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300 bg-white p-1 outline-none focus:border-indigo-500 dark:border-[#3c3c3c] dark:bg-[#1e1e1e]"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Crea corso
            </button>
          </div>
        </form>
      )}

      {/* Lista corsi */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            id={course.id}
            onClick={handleClick}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-[#303030] dark:bg-[#252526] dark:hover:bg-[#2a2d2e]"
          >
            {/* Badge */}
            <div className="mb-5 flex items-center justify-between">
              <span
                className="rounded-lg px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: course.color }}
              >
                {course.name}
              </span>

              {course.recent && (
                <span className="text-xs font-medium text-green-600 dark:text-[#73c991]">
                  Recente
                </span>
              )}
            </div>

            {/* Titolo */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-[#cccccc]">
              {course.name}
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-[#9d9d9d]">
              {course.description}
            </p>

            {/* Info */}
            <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600 dark:border-[#303030] dark:text-[#9d9d9d]">
              <div className="flex justify-between">
                <span>Professore</span>

                <span className="font-medium text-gray-900 dark:text-[#cccccc]">
                  {course.professor}
                </span>
              </div>

              <div className="flex justify-between">
                <span>CFU</span>

                <span className="font-medium text-gray-900 dark:text-[#cccccc]">
                  {course.cfu}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Semestre</span>

                <span className="font-medium text-gray-900 dark:text-[#cccccc]">
                  {course.semester}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Anno</span>

                <span className="font-medium text-gray-900 dark:text-[#cccccc]">
                  {course.year}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Appunti</span>

                <span className="font-medium text-gray-900 dark:text-[#cccccc]">
                  {course.notesCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nessun corso */}
      {courses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center transition-colors dark:border-[#3c3c3c] dark:bg-[#252526]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#cccccc]">
            Nessun corso
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-[#9d9d9d]">
            Crea il tuo primo corso per iniziare.
          </p>
        </div>
      )}
    </div>
  );
}
