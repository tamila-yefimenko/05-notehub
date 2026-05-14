import axios from 'axios';
import type { NotesHTTPResponce, Note } from '../types/note';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (search: string, page: number) => {
  const responce = await axios.get<NotesHTTPResponce>(
    'https://notehub-public.goit.study/api/notes',
    {
      params: {
        search,
        page,
        perPage: 12,
      },
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return responce.data;
};

export const createNote = async (note: string) => {
  const responce = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    note,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return responce.data;
};

export const deleteNote = async (id: string) => {
  await axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
