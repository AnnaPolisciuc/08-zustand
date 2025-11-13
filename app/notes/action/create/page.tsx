
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note - My Notes App",
  description: "Create a new note quickly and easily in My Notes App.",
  openGraph: {
    title: "Create Note - My Notes App",
    description: "Create a new note quickly and easily in My Notes App.",
    url: "https://08-zustand-beige.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note",
      },
    ],
  },
};


const CreateNote = async () => {
  return (
    <main className={css.main}>
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
         <NoteForm />
    </div>
  </main> );
}
export default CreateNote;