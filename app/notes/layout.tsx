import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css"

interface LayoutNotesProps {
  children: ReactNode; 
  sidebar?: ReactNode;  
  modal?: ReactNode;   
}

export default function LayoutNotes({ children, sidebar, modal }: LayoutNotesProps) {
  return (
    <div className={css.container}>
      {sidebar && (
        <aside className={css.sidebar}>
          {sidebar}
        </aside>
      )}
      <main className={css.notesWrapper}>
        {children}
        {modal}
      </main>
    </div>
  );
}
