export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NotesHTTPResponce {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export type NoteSort = 'created' | 'updated';
