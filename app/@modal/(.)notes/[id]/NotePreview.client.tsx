"use client";

import { useRouter } from "next/navigation";
import { Note } from "@/types/note";
import css from "./NotePreview.module.css";


interface NotePreviewProps {
  note: Note;
  onClose?: () => void;
}

export default function NotePreview({ note, onClose }: NotePreviewProps) {
  const router = useRouter();
  const handleClose = () => {
    if (onClose) onClose();
    else router.back();
  };

  const isClient = typeof window !== "undefined";
  const formattedDate = isClient
    ? new Date(note.createdAt).toLocaleDateString("en-GB")
    : "";

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>{note.title}</h2>
        <span className={css.tag}>{note.tag}</span>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {formattedDate}</p>
        <button className={css.closeButton} onClick={handleClose}>
        ×
        </button>
      </div>
    </div>
  );
}
