"use client";

import type React from "react";

/**
 * Bookmark Button Component
 * Toggle button for bookmarking/unbookmarking jobs
 * Restricted to authenticated users only
 */

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookmark } from "../contexts/BookmarkContext";
import { Bookmark, BookmarkCheck, Heart, HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookmarkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  jobId: string;
  variant?: "bookmark" | "heart";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  onAuthRequired?: () => void;
}

export function BookmarkButton({
  jobId,
  variant = "bookmark",
  size = "md",
  showText = false,
  onAuthRequired,
  className = "",
  ...rest
}: BookmarkButtonProps) {
  const { isAuthenticated } = useAuth();
  const { isBookmarked, toggleBookmark, isLoading } = useBookmark();
  const [isToggling, setIsToggling] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const bookmarked = isBookmarked(jobId);

  /**
   * Handle bookmark toggle with authentication check
   */
  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check authentication first
    if (!isAuthenticated) {
      if (typeof window !== "undefined" && (window as any).Cypress) {
        console.log(
          "[BookmarkButton] Not authenticated - triggering auth required feedback"
        );
      }
      onAuthRequired?.();
      setFeedback("Please login to bookmark jobs");
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    try {
      setIsToggling(true);
      setFeedback(null);

      await toggleBookmark(jobId);
      if (typeof window !== "undefined" && (window as any).Cypress) {
        console.log(
          "[BookmarkButton] Toggled bookmark for",
          jobId,
          "now bookmarked?",
          !bookmarked
        );
      }

      // Show success feedback
      const action = bookmarked ? "removed from" : "added to";
      setFeedback(`Job ${action} bookmarks`);
      setTimeout(() => setFeedback(null), 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update bookmark";
      setFeedback(errorMessage);
      setTimeout(() => setFeedback(null), 3000);
    } finally {
      setIsToggling(false);
    }
  };

  /**
   * Get icon based on variant and state
   */
  const getIcon = () => {
    const iconSize =
      size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

    if (variant === "heart") {
      return bookmarked ? (
        <Heart className={`${iconSize} fill-current`} />
      ) : (
        <HeartOff className={`${iconSize}`} />
      );
    }

    return bookmarked ? (
      <BookmarkCheck className={`${iconSize} fill-current`} />
    ) : (
      <Bookmark className={`${iconSize}`} />
    );
  };

  /**
   * Get button styling based on state
   */
  const getButtonClass = () => {
    const baseClass = "transition-all duration-200 relative";
    const sizeClass = size === "sm" ? "p-1" : size === "lg" ? "p-3" : "p-2";

    if (bookmarked) {
      return `${baseClass} ${sizeClass} text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200`;
    }

    return `${baseClass} ${sizeClass} text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-200`;
  };

  const disabled = isLoading || isToggling;

  return (
    <div className="relative">
      <Button
        variant="outline"
        size={size === "sm" ? "sm" : "default"}
        onClick={handleToggle}
        disabled={disabled}
        className={`${getButtonClass()} ${className}`}
        title={
          !isAuthenticated
            ? "Login to bookmark jobs"
            : bookmarked
            ? "Remove from bookmarks"
            : "Add to bookmarks"
        }
        data-testid="bookmark-button"
        {...rest}
      >
        {disabled ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
        ) : (
          getIcon()
        )}
        {showText && (
          <span className="ml-2 text-sm">
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </span>
        )}
      </Button>

      {/* Feedback Tooltip */}
      {feedback && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-10">
          {feedback}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
        </div>
      )}
    </div>
  );
}
