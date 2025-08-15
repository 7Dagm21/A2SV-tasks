"use client";

/**
 * Bookmark Context
 * Provides bookmark state and methods throughout the application
 */

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getBookmarks,
  createBookmark,
  removeBookmark,
} from "../services/bookmark";
import { useAuth } from "./AuthContext";
import type { BookmarkContextType } from "../types/bookmark";

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load bookmarks when user is authenticated
   */
  useEffect(() => {
    console.log(
      "[BookmarkContext] isAuthenticated:",
      isAuthenticated,
      "user:",
      user
    );
    if (isAuthenticated && user) {
      refreshBookmarks();
    } else {
      // Clear bookmarks when user logs out
      setBookmarkedJobs(new Set());
      setError(null);
    }
  }, [isAuthenticated, user]);

  /**
   * Fetch all bookmarks from API
   */
  const refreshBookmarks = async () => {
    if (!isAuthenticated) {
      setError("Authentication required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await getBookmarks();
      const bookmarkIds = new Set(
        response.data.map((bookmark) => bookmark.eventID)
      );
      setBookmarkedJobs(bookmarkIds);

      console.log(`✅ Loaded ${bookmarkIds.size} bookmarks`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load bookmarks";
      setError(errorMessage);
      console.error("❌ Error loading bookmarks:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle bookmark status for a job
   */
  const toggleBookmark = async (jobId: string) => {
    if (!isAuthenticated) {
      throw new Error(
        "Authentication required. Please login to bookmark jobs."
      );
    }

    try {
      setIsLoading(true);
      setError(null);

      const isCurrentlyBookmarked = bookmarkedJobs.has(jobId);

      if (isCurrentlyBookmarked) {
        // Remove bookmark
        await removeBookmark(jobId);
        setBookmarkedJobs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
        console.log(`✅ Removed bookmark for job: ${jobId}`);
      } else {
        // Add bookmark
        await createBookmark(jobId);
        setBookmarkedJobs((prev) => new Set(prev).add(jobId));
        console.log(`✅ Added bookmark for job: ${jobId}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to toggle bookmark";
      setError(errorMessage);
      console.error(
        `❌ Error toggling bookmark for job ${jobId}:`,
        errorMessage
      );
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Check if a job is bookmarked
   */
  const isBookmarked = (jobId: string): boolean => {
    return bookmarkedJobs.has(jobId);
  };

  const value: BookmarkContextType = {
    bookmarkedJobs,
    isLoading,
    error,
    toggleBookmark,
    isBookmarked,
    refreshBookmarks,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}

/**
 * Hook to use bookmark context
 */
export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
}
