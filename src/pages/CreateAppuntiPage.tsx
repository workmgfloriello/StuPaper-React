import { File } from "@/interface/interface";
import { useCourses } from "@/lib/context/CoursesContext";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function CreateAppuntiPage() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");

  const { courses } = useCourses();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !course.trim()) {
      return;
    }

    const newFile: File = {
      id: "test10",
      name: name,
      directory: description,
      course: course,
      createAt: new Date(),
    };

    const electronAPI = window.electronAPI as
      | { createFile?: (file: File) => void }
      | undefined;

    electronAPI?.createFile?.(newFile);
  };

  return (
    
      <><div
      onClick={() => window.history.back()}
      className="absolute left-6 top-6 flex cursor-pointer items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm transition hover:bg-indigo-50"
    >
      <ArrowLeft size={18} />
      <span>Torna indietro</span>
    </div><div className="flex min-h-screen items-center justify-center bg-indigo-50/60 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-6 rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm shadow-indigo-100"
        >
          <div>
            <h1 className="text-2xl font-bold text-indigo-950">
              Nuovo appunto
            </h1>

            <p className="mt-1 text-sm text-indigo-600">
              Inserisci le informazioni del tuo appunto.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-indigo-900">
              Nome appunto
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Es. Derivate e integrali"
              className="w-full rounded-lg border border-indigo-200 bg-indigo-50/40 px-3 py-2 text-indigo-900 placeholder:text-indigo-300 outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              autoFocus />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-indigo-900">
              Corso
            </label>

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-lg border border-indigo-200 bg-indigo-50/40 px-3 py-2 text-indigo-900 outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Seleziona un corso</option>
              {courses.map((courseItem) => (
                <option key={courseItem.id} value={courseItem.id}>
                  {courseItem.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-indigo-900">
              Descrizione
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrizione opzionale..."
              rows={3}
              className="w-full resize-none rounded-lg border border-indigo-200 bg-indigo-50/40 px-3 py-2 text-indigo-900 placeholder:text-indigo-300 outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !course.trim()}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-200 disabled:text-indigo-400"
          >
            Crea appunto
          </button>
        </form>
      </div></>
    
  );
}
