"use client";

// Centralized client-side providers (Auth, Bookmark, etc.)
import { AuthProvider } from "../contexts/AuthContext";
import { BookmarkProvider } from "../contexts/BookmarkContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <BookmarkProvider>{children}</BookmarkProvider>
    </AuthProvider>
  );
}
