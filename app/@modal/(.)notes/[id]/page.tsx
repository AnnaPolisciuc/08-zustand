
import { fetchNoteById } from "@/lib/api";

import Modal from "@/components/Modal/Modal";
import NotePreview from "./NotePreview.client";

interface ModalNotePageProps {
  params: Promise<{ id: string }>; 
}

export default async function ModalNotePage(props: ModalNotePageProps) {
  const { id } = await props.params;
  const note = await fetchNoteById(id);

return (
  <>
  <Modal>
  <NotePreview note={note}/>
    </Modal>
  </>
);
};

