"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import Modal from "../../../../components/Modal/Modal";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return (
      <Modal>
        <p className={css.loading}>Loading...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal>
        <p className={css.error}>Failed to load note 😢</p>
      </Modal>
    );
  }

  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-GB");

  return (
    <Modal>
      <div className={css.modalContent}>
        <h2 className={css.title}>{note.title}</h2>
        <span className={css.tag}>{note.tag}</span>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {formattedDate}</p>
        <button
          className={css.closeButton}
          onClick={() => router.back()}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </Modal>
  );
}
