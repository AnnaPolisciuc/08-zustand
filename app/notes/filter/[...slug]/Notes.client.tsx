"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, NoteResponse } from "@/lib/api";
import NotesList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Loading from "../../loading";
import ErrorComponent from "./error";
import Link from "next/link";
import SearchBox from "@/components/SearchBox/SearchBox";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debounced, setDebounced] = useState<string>("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const queryKey = useMemo(() => ["notes", page, debounced, tag], [page, debounced, tag]);

  const { data, isLoading, error, isFetching } = useQuery<NoteResponse, Error>({
    queryKey,
    queryFn: () => fetchNotes(page, 12, debounced, tag),
    staleTime: 1000 * 5,
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  if (isLoading) return <Loading />;
  if (error || !data)
    return <ErrorComponent error={error ?? new Error("No data")} reset={() => setPage(1)} />;

  const notes = data.notes ?? [];
  const totalPages = data.totalPages ?? 1;
 
  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
      <Link
  href="/notes/action/create"
  style={{
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 16px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.1s ease",
    textDecoration: "none",
    display: "inline-block",
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0b5ed7")}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0d6efd")}
  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  Create Note +
</Link>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {isFetching && <span style={{ marginLeft: 8 }}>Loading…</span>}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
      )}
      <NotesList notes={notes} />
    </div>
  );
}
