import NotesClient from './[...slug]/Notes.client';

type Props = {
  params: {
    slug?: string[] | Promise<string[]>;
  };
};

export default async function NotesPage({ params }: Props) {

  const slugArray = Array.isArray(params.slug) ? params.slug : await params.slug;
  const tag = slugArray?.[0] === "all" ? undefined : slugArray?.[0];

  return <NotesClient tag={tag} />;
}
