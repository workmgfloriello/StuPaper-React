import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { app } from "electron";
import type { Course } from "../src/interface/interface.ts";

let db: Database.Database | null = null;

export function getDatabase() {
  if (db) {
    return db;
  }

  const dataPath = app.getPath("userData");

  fs.mkdirSync(dataPath, { recursive: true });

  const dbPath = path.join(dataPath, "stupaperBase.db");

  db = new Database(dbPath);

  initializeDatabase(db);

  console.log("SQLite:", dbPath);

  return db;
}

function initializeDatabase(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS courses (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
      code TEXT,
        professor TEXT,
         cfu INTEGER,
         semester INTEGER,
         notes_count INTEGER DEFAULT 0,
        description TEXT,
        color TEXT,
        recent INTEGER DEFAULT 0,
     year INTEGER
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL,

      FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL,
      subject_id TEXT,
      title TEXT NOT NULL,
      content TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,

      FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

      FOREIGN KEY (subject_id)
        REFERENCES subjects(id)
        ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
}


//Course
export function insertCourse(course: Course) {
  const db = getDatabase();

  const stmt = db.prepare(
    ` INSERT INTO courses ( id, name, code, professor, cfu, semester, notes_count, description, color, recent, year ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `,
  );

  stmt.run( course.id, course.name, course.code, course.professor, course.cfu, course.semester, course.notesCount, course.description, course.color, course.recent ? 1 : 0, course.year ); return course;
}

export function selectCourses(){
  const db = getDatabase();
  const courses = db.prepare(
    'SELECT * FROM courses'
  )
  .all()
  return courses;
}