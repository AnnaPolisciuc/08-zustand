// app/notes/filter/layout.tsx

import NotesClient from '../filter/[...slug]/Notes.client';
import SidebarNotes from './@sidebar/SidebarNotes';

export default function FilterLayout() {

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <SidebarNotes />
      <main style={{ flex: 1 }}>
        <NotesClient />
      </main>
    </div>
  );
}
