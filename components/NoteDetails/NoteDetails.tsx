"use client";
import css from "./NoteDetails.module.css";
import type { Note } from "@/types/note";

interface NoteDetailsProps {
  note: Note;
}

export default function NoteDetails({ note }: NoteDetailsProps) {
  if (!note) {
    return <p className={css.message}>Note not found.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {new Date(note.createdAt).toLocaleDateString("en-GB")}</p>
      </div>
    </div>
  );
}