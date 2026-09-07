import { useState } from "react";

export interface NewNoteData {
  name: string;
  course: string;
  description?: string;
}

interface CreateAppuntiPageProps {
  onCreate: (data: NewNoteData) => void;
}

export default function CreateAppuntiPage({
  onCreate,
}: CreateAppuntiPageProps) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !course.trim()) {
      return;
    }

    onCreate({
      name: name.trim(),
      course: course.trim(),
      description: description.trim() || undefined,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold">
            Nuovo appunto
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Inserisci le informazioni del tuo appunto.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Nome appunto
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Es. Derivate e integrali"
            className="w-full rounded-lg border px-3 py-2 outline-none"
            autoFocus
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Corso
          </label>

          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Es. Analisi 1"
            className="w-full rounded-lg border px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Descrizione
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrizione opzionale..."
            rows={3}
            className="w-full resize-none rounded-lg border px-3 py-2 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim() || !course.trim()}
          className="w-full rounded-lg px-4 py-2 font-medium disabled:opacity-50"
        >
          Crea appunto
        </button>
      </form>
    </div>
  );
}