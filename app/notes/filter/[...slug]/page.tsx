import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] || "all";
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
      type: "article",
    },
  };
}

export default async function NotesByTagPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? undefined : slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, 12, "", tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
