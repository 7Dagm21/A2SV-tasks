/**
 * Bookmark Service
 * Handles all bookmark-related API calls
 */

import type {
  BookmarkResponse,
  BookmarkActionResponse,
} from "../types/bookmark";
import { tokenStorage } from "./auth";

const API_BASE_URL = "https://akil-backend.onrender.com";

/**
 * Fetches all bookmarked jobs for the authenticated user
 * @returns Promise<BookmarkResponse> - List of bookmarked jobs
 */
export async function getBookmarks(): Promise<BookmarkResponse> {
  try {
    const accessToken = tokenStorage.getAccessToken();
    console.log("🔄 Fetching bookmarks with token:", accessToken);
    if (!accessToken) {
      throw new Error("No access token found. Please login first.");
    }
    const response = await fetch(`${API_BASE_URL}/bookmarks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication required. Please login again.");
      }
      throw new Error(`Failed to fetch bookmarks: ${response.status}`);
    }
    const data: BookmarkResponse = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch bookmarks");
    }
    console.log(`✅ Successfully fetched ${data.data.length} bookmarks`);
    return data;
  } catch (error) {
    console.error("❌ Error fetching bookmarks:", error);
    throw error;
  }
}

/**
 * Creates a bookmark for a specific job
 * @param jobId - The job ID to bookmark
 * @returns Promise<BookmarkActionResponse> - Bookmark creation response
 */
export async function createBookmark(
  jobId: string
): Promise<BookmarkActionResponse> {
  try {
    const accessToken = tokenStorage.getAccessToken();
    console.log(
      `🔄 Creating bookmark for job: ${jobId} with token:`,
      accessToken
    );
    if (!accessToken) {
      throw new Error("No access token found. Please login first.");
    }
    const response = await fetch(`${API_BASE_URL}/bookmarks/${jobId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}), // Empty body as specified in requirements
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication required. Please login again.");
      }
      if (response.status === 409) {
        throw new Error("Job is already bookmarked.");
      }
      throw new Error(`Failed to create bookmark: ${response.status}`);
    }
    const data: BookmarkActionResponse = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to create bookmark");
    }
    console.log(`✅ Successfully bookmarked job: ${jobId}`);
    return data;
  } catch (error) {
    console.error(`❌ Error creating bookmark for job ${jobId}:`, error);
    throw error;
  }
}

/**
 * Removes a bookmark for a specific job
 * @param jobId - The job ID to unbookmark
 * @returns Promise<BookmarkActionResponse> - Bookmark removal response
 */
export async function removeBookmark(
  jobId: string
): Promise<BookmarkActionResponse> {
  try {
    const accessToken = tokenStorage.getAccessToken();
    console.log(
      `🔄 Removing bookmark for job: ${jobId} with token:`,
      accessToken
    );
    if (!accessToken) {
      throw new Error("No access token found. Please login first.");
    }
    const response = await fetch(`${API_BASE_URL}/bookmarks/${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication required. Please login again.");
      }
      if (response.status === 404) {
        throw new Error("Bookmark not found.");
      }
      throw new Error(`Failed to remove bookmark: ${response.status}`);
    }
    const data: BookmarkActionResponse = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to remove bookmark");
    }
    console.log(`✅ Successfully removed bookmark for job: ${jobId}`);
    return data;
  } catch (error) {
    console.error(`❌ Error removing bookmark for job ${jobId}:`, error);
    throw error;
  }
}
