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

export type NoteTag = 'work' | 'personal' | 'meeting' | 'shopping' | 'todo';

export type NoteSort = 'created' | 'updated';
