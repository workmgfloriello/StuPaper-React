import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { app } from "electron";

import type { Course, Note } from "../src/interface/interface.ts";

let db: DatabaseSync | null = null;

/**
 * =========================
 * DATABASE
 * =========================
 */

export function getDatabase(): DatabaseSync {
  if (db) {
    return db;
  }

  const dataPath = app.getPath("userData");

  fs.mkdirSync(dataPath, {
    recursive: true,
  });

  const dbPath = path.join(dataPath, "stupaperBase.db");

  db = new DatabaseSync(dbPath);

  // Abilita foreign keys
  db.exec("PRAGMA foreign_keys = ON");

  initializeDatabase(db);

  console.log("SQLite:", dbPath);

  return db;
}

function initializeDatabase(database: DatabaseSync) {
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


    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      course TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL,

      FOREIGN KEY (course)
        REFERENCES courses(id)
        ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
}

/**
 * =========================
 * COURSES
 * =========================
 */

export function insertCourse(course: Course) {
  const database = getDatabase();

  const stmt = database.prepare(`
    INSERT INTO courses (
      id,
      name,
      code,
      professor,
      cfu,
      semester,
      notes_count,
      description,
      color,
      recent,
      year
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    course.id,
    course.name,
    course.code,
    course.professor,
    course.cfu,
    course.semester,
    course.notesCount,
    course.description,
    course.color,
    course.recent ? 1 : 0,
    course.year
  );

  return course;
}

export function selectCourses() {
  const database = getDatabase();

  return database
    .prepare("SELECT * FROM courses")
    .all();
}

/**
 * =========================
 * NOTES
 * =========================
 */

export function insertNotes(note: Note){
   const database = getDatabase();

  const stmt = database.prepare(`
    INSERT INTO notes (
      id,
      course,
      name,
      created_at
    )
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(
    note.id,
    note.course,
    note.name,
    note.data.toISOString()
  ); 

  return note;

}

export function selectNotes() {
  const database = getDatabase();

  return database
    .prepare("SELECT * FROM notes")
    .all();
}



