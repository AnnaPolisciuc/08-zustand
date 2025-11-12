"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {  deleteNote, fetchNotes } from "@/lib/api";
import NoteList from "../NoteList/NoteList";
import { NoteCreate } from "@/types/note";

interface NotesPageProps {
  tag: NoteCreate["tag"] | "all";
}

export default function NotesPage({ tag }: NotesPageProps) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, 12, "", tag),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes", tag] }),
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (!data?.notes.length) return <p>No notes found.</p>;

  return <NoteList notes={data.notes} />;
}
