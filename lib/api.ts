
import axios from "axios";
import type { NoteCreate, Note } from "../types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api/notes",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});


export async function fetchNotes(page = 1, perPage = 12, search = '', tag?:string): Promise<NoteResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search.trim();
  if(tag) params.tag = tag;
  const { data } = await api.get<NoteResponse>("/", { params }); 
  return data;
}


export async function createNote(note: NoteCreate): Promise<Note> {
  const { data } = await api.post<Note>("/", note);
  return data;
}


export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/${id}`);
  return data;
}


export async function fetchNoteById(id: string): Promise<Note> {
  if (!id) throw new Error("Note id is required");
  const response = await api.get<Note>(`/${id}`);
  return response.data;
}

export async function fetchNotesByTag(tag?: string, page = 1, perPage = 12): Promise<NoteResponse> {
  const params: Record<string, string | number> = { page, perPage };
  
  if (tag && tag !== "all") params.tag = tag; 

  const { data } = await api.get<NoteResponse>("/", { params });
  return data;
}


