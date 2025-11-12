
import type { ReactNode } from 'react';

interface FilterLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {sidebar}
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
