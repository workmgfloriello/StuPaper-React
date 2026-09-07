import { Course, Note } from "../interface/interface";

export const initilCourses: Course[] = [
  {
    id: "analisi-1",
    name: "Analisi Matematica I",
    code: "AN1",
    professor: "Giuseppe Rossi",
    cfu: 9,
    semester: 1,
    notesCount: 12,
    description: "Limiti, derivate, integrali e studio delle funzioni.",
    color: "bg-indigo-100 text-indigo-700",
    recent: false,
    year: 1
  },

  {
    id: "fisica",
    name: "Fisica Generale",
    code: "FIS",
    professor: "Marco Bianchi",
    cfu: 9,
    semester: 1,
    notesCount: 8,
    description:
      "Meccanica, dinamica, energia, lavoro e termodinamica.",
    color: "bg-sky-100 text-sky-700",
    recent: true,
    year: 1
  },

  {
    id: "informatica",
    name: "Informatica",
    code: "INF",
    professor: "Luca Esposito",
    cfu: 6,
    semester: 2,
    notesCount: 15,
    description:
      "Algoritmi, strutture dati e fondamenti di programmazione.",
    color: "bg-emerald-100 text-emerald-700",
    recent: true,
    year: 1
  },
];

export const initialNotes: Note[] = [
  {
    id: "note-1",
    name: "Derivate e studio di funzione",
    course: "analisi-1",
    data: new Date("2026-08-28"),
  },
  {
    id: "note-2",
    name: "Integrali definiti",
    course: "analisi-1",
    data: new Date("2026-08-25"),
  },
  {
    id: "note-3",
    name: "Limiti e continuità",
    course: "analisi-1",
    data: new Date("2026-08-22"),
  },
  {
    id: "note-4",
    name: "Programmazione ad oggetti",
    course: "informatica",
    data: new Date("2026-08-20"),
  },
  {
    id: "note-5",
    name: "Strutture dati",
    course: "informatica",
    data: new Date("2026-08-17"),
  },
  {
    id: "note-6",
    name: "Moto rettilineo uniforme",
    course: "fisica",
    data: new Date("2026-08-15"),
  },
  {
    id: "note-7",
    name: "Leggi di Newton",
    course: "fisica",
    data: new Date("2026-08-12"),
  },
];