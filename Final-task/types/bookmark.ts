/**
 * Bookmark Types
 * Defines interfaces for bookmark functionality
 */

export interface BookmarkResponse {
  success: boolean
  message: string
  data: BookmarkedJob[]
}

export interface BookmarkedJob {
  eventID: string
  title: string
  company: string
  location: string
  logoUrl?: string
  dateBookmarked: string
}

export interface BookmarkActionResponse {
  success: boolean
  message: string
}

export interface BookmarkContextType {
  bookmarkedJobs: Set<string>
  isLoading: boolean
  error: string | null
  toggleBookmark: (jobId: string) => Promise<void>
  isBookmarked: (jobId: string) => boolean
  refreshBookmarks: () => Promise<void>
}
