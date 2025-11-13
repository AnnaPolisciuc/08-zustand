import css from "./Page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata ={
  title: 'Page Not Found - NoteHub',
  description: "Sorry, the page you're looking for doesn’t exist. Go back to the NoteHub homepage.",
  openGraph: {
    title:'Page Not Found — NoteHub',
    description:
      "Sorry, the page you’re looking for doesn’t exist. Go back to the NoteHub homepage.",
    url: "https://08-zustand-beige.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — Page Not Found",
      },
    ],
  }
}
export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}