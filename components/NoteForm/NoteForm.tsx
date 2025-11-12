"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNote(draft);
      clearDraft();
      router.back(); 
    } catch (err) {
      console.error(err);
      alert("Failed to create note");
    }
  };

  const handleCancel = () => {
    router.back(); 
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={draft.title}
        onChange={handleChange}
        className={css.input}
        required
        minLength={3}
        maxLength={50}
      />

      <textarea
        name="content"
        placeholder="Content"
        value={draft.content}
        onChange={handleChange}
        className={css.textarea}
        maxLength={500}
      />

      <select name="tag" value={draft.tag} onChange={handleChange} className={css.select}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.buttons}>
        <button type="submit" className={css.submitButton}>Create Note</button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}
