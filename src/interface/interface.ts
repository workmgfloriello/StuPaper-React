export interface Course {
  id: string;
  name: string;
  code: string;
  professor: string;
  cfu: number;
  semester: number;
  year: number;
  notesCount: number;
  description: string;
  color: string;
  recent: boolean;
}

export type Note = {
  id: string;
  name: string;
  course: string;
  data: Date;
};

export type File = {
  id: string,
  name: string,
  directory: string,
  course: string,
  description?: string,
  created_at: Date,
}

export type ElectronApi = {
  //corsi
  selectCourses?: () => Promise<any[]>;
  insertCourse?: (course: any) => Promise<any>;
  updateRecent?: (courseId: string, newRecent: boolean) => Promise<any>;

  //file
  createFile?: (file: File) => any;
  exportPDF?: () => void | Promise<void>;
  openFile?: (fileName: string) => any;
  saveFile?: (data: any, name: any) => any;
  delateFile?: (fileName: string) => any;
  renameFile?: (fileName: string, newName: string) => any;
}
