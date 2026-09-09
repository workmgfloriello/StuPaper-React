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

export type FileData = {
  name: string;
  lastEdit: Date;
};

export type File = {
  id:string,
  name:string,
  directory:string,
  course:string,
  description?:string,
  createAt: Date,
}