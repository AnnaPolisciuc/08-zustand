import type { Metadata } from "next";
import NotesClient from './Notes.client';

type Props = {
  params: {
    slug?: string[];
  };
};

export async function genetateMetadata({params}:Props): Promise<Metadata> {
  const filter = params.slug?.[0] || "all";
  const filterName = filter === "all" ? "All Notes" : `Notes filtered by "${filter}"`;

  const title = `${filterName} - NoteHub`;
  const description = `Browse and manage your ${filter === "all" ? "all notes" : `notes filtered by "${filter}"`} in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://07-routing-nextjs-phi-black.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub — filtered notes",
        },
      ],
      type: 'article',
    }
  }
}
export default function NotesByTag(){
  return <NotesClient />;
}