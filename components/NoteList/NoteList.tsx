"use client";

import css from "./NoteList.module.css";
import type { Note } from "@/types/note";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { useState } from "react";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onMutate: (id) => {
      setDeletingId(id);
      setErrorId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]});
      setDeletingId(null);
    },
    onError: (_, id) => {
      setErrorId(id);
      setDeletingId(null);
    },
  });

  if (!notes.length) {
    return <p className={css.message}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <span className={css.tag}>{note.tag}</span>
          <p className={css.content}>{note.content.slice(0, 100)}...</p>
          
          <div className={css.actions}>
            <button
              className={css.deleteButton}
              disabled={deletingId === note.id}
              onClick={() => mutation.mutate(note.id)}
            >
              {deletingId === note.id ? "Deleting..." : "Delete note"}
            </button>
            {errorId === note.id && (
              <div className={css.error}>Failed to delete note. Please try again.</div>
            )}
          </div>
          <Link
          className={css.link}
          href={`/notes/${note.id}`} 
        >
  View details
</Link>
        </li>
      ))}
    </ul>
  );
}
