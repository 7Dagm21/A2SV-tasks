/**
 * Redux Toolkit slice for managing job opportunities state
 *
 * This slice handles all job-related state management including:
 * - Fetching job listings from the API
 * - Fetching individual job details
 * - Managing loading states and errors
 * - Sorting functionality
 * - Caching job data
 *
 * Uses Redux Toolkit's createSlice and createAsyncThunk for
 * simplified Redux logic with built-in best practices.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

/**
 * TypeScript interface defining the structure of a job opportunity
 *
 * This interface ensures type safety throughout the application
 * and documents the expected data structure from the API.
 */
export interface Job {
  // Core identification and basic info
  id: string;
  title: string;
  description: string;
  orgName: string;
  location: string;

  // Date fields
  datePosted: string;
  deadline?: string;
  startDate?: string;
  endDate?: string;

  // Job classification
  opType: string; // Full-time, Part-time, Contract, etc.
  categories: string[]; // Job categories/tags

  // Detailed job information
  requirements?: string[];
  responsibilities?: string;
  website?: string;
  logoUrl?: string;
  whenAndWhere?: string;
  idealCandidate?: string;
  requiredSkills?: string[];

  // Allow additional fields from API that we might not know about
  [key: string]: any;
}

/**
 * TypeScript interface for the jobs slice state
 *
 * Defines the shape of the Redux state for job-related data
 */
interface JobsState {
  jobs: Job[]; // Array of all fetched jobs
  currentJob: Job | null; // Currently selected job for detail view
  loading: boolean; // Loading state for async operations
  error: string | null; // Error message if operations fail
  sortBy: "most-relevant" | "newest-first" | "oldest-first"; // Current sort preference
}

/**
 * Initial state for the jobs slice
 *
 * Defines the default values when the application starts
 */
const initialState: JobsState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
  sortBy: "most-relevant",
};

// API Base URL - centralized configuration
const BASE_URL = "https://akil-backend.onrender.com";

/**
 * Async thunk for fetching all job opportunities
 *
 * This thunk handles the complete flow of fetching jobs from the API:
 * 1. Makes HTTP request with timeout protection
 * 2. Handles various response structures
 * 3. Transforms API data to match our Job interface
 * 4. Provides comprehensive error handling
 *
 * @returns Promise<Job[]> - Array of transformed job objects
 * @rejects string - Error message for failed requests
 */
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      // Set up request timeout protection
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // Make API request with proper headers
      const response = await fetch(`${BASE_URL}/opportunities/search`, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Clean up timeout
      clearTimeout(timeoutId);

      // Handle HTTP errors with specific messages
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No opportunities found");
        } else if (response.status >= 500) {
          throw new Error("Server error occurred. Please try again later.");
        } else {
          throw new Error(
            `HTTP error ${response.status}: ${response.statusText}`
          );
        }
      }

      // Parse JSON response
      const data = await response.json();

      // Handle different API response structures
      // The API might return data in various formats
      let opportunities: any[] = [];
      if (Array.isArray(data)) {
        opportunities = data;
      } else if (data.data && Array.isArray(data.data)) {
        opportunities = data.data;
      } else if (data.opportunities && Array.isArray(data.opportunities)) {
        opportunities = data.opportunities;
      } else {
        throw new Error("Invalid response structure from API");
      }

      // Transform API data to match our Job interface
      const transformedJobs: Job[] = opportunities.map(
        (opportunity, index) => ({
          // Core fields with fallback values
          id: opportunity.id || `job-${index}`,
          title: opportunity.title || "Untitled Position",
          description: opportunity.description || "",
          orgName: opportunity.orgName || opportunity.company || "Company Name",
          location: opportunity.location || "Remote",

          // Date fields with ISO string fallbacks
          datePosted:
            opportunity.datePosted ||
            opportunity.createdAt ||
            new Date().toISOString(),
          deadline: opportunity.deadline || opportunity.endDate || null,
          startDate: opportunity.startDate || null,
          endDate: opportunity.endDate || null,

          // Job classification with defaults
          opType: opportunity.opType || opportunity.type || "Full-time",
          categories: Array.isArray(opportunity.categories)
            ? opportunity.categories
            : [],

          // Detailed information with type checking
          requirements: Array.isArray(opportunity.requirements)
            ? opportunity.requirements
            : [],
          responsibilities:
            typeof opportunity.responsibilities === "string"
              ? opportunity.responsibilities
              : "",
          website: opportunity.website || opportunity.companyWebsite || null,
          logoUrl: opportunity.logoUrl || opportunity.image || null,
          whenAndWhere: opportunity.whenAndWhere || null,
          idealCandidate: opportunity.idealCandidate || null,
          requiredSkills: Array.isArray(opportunity.requiredSkills)
            ? opportunity.requiredSkills
            : [],

          // Preserve all original fields from API
          ...opportunity,
        })
      );

      return transformedJobs;
    } catch (error: any) {
      // Handle different types of errors with appropriate messages
      if (error.name === "AbortError") {
        return rejectWithValue("Request timeout - please try again");
      }
      return rejectWithValue(error.message || "Failed to fetch jobs");
    }
  }
);

/**
 * Async thunk for fetching a specific job by ID
 *
 * This thunk handles fetching detailed information about a single job
 * for the job detail pages. It includes the same error handling and
 * data transformation as the fetchJobs thunk.
 *
 * @param id - The unique job identifier
 * @returns Promise<Job> - The transformed job object
 * @rejects string - Error message for failed requests
 */
export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id: string, { rejectWithValue }) => {
    try {
      // Set up request timeout protection
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // Make API request for specific job
      const response = await fetch(`${BASE_URL}/opportunities/${id}`, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Clean up timeout
      clearTimeout(timeoutId);

      // Handle HTTP errors
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Job not found");
        } else if (response.status >= 500) {
          throw new Error("Server error occurred. Please try again later.");
        } else {
          throw new Error(
            `HTTP error ${response.status}: ${response.statusText}`
          );
        }
      }

      // Parse JSON response
      const data = await response.json();

      // Handle different response structures
      let opportunity: any = null;
      if (data.data) {
        opportunity = data.data;
      } else if (data.opportunity) {
        opportunity = data.opportunity;
      } else {
        opportunity = data;
      }

      // Validate that we received a valid opportunity object
      if (!opportunity || typeof opportunity !== "object") {
        throw new Error("Invalid job data received");
      }

      // Transform API data to match our Job interface
      // Preserve ALL original fields to ensure nothing is lost
      const transformedJob: Job = {
        // Core fields with fallbacks
        id: opportunity.id || id,
        title: opportunity.title || "Untitled Position",
        description: opportunity.description || "",
        orgName: opportunity.orgName || opportunity.company || "Company Name",
        location: opportunity.location || "Remote",

        // Date fields
        datePosted:
          opportunity.datePosted ||
          opportunity.createdAt ||
          new Date().toISOString(),
        deadline: opportunity.deadline || opportunity.endDate || null,
        startDate: opportunity.startDate || null,
        endDate: opportunity.endDate || null,

        // Job classification
        opType: opportunity.opType || opportunity.type || "Full-time",
        categories: Array.isArray(opportunity.categories)
          ? opportunity.categories
          : [],

        // Detailed information with type validation
        requirements: Array.isArray(opportunity.requirements)
          ? opportunity.requirements
          : [],
        responsibilities:
          typeof opportunity.responsibilities === "string"
            ? opportunity.responsibilities
            : "",
        requiredSkills: Array.isArray(opportunity.requiredSkills)
          ? opportunity.requiredSkills
          : [],

        // Additional fields
        website: opportunity.website || opportunity.companyWebsite || null,
        logoUrl: opportunity.logoUrl || opportunity.image || null,
        whenAndWhere: opportunity.whenAndWhere || null,
        idealCandidate: opportunity.idealCandidate || null,

        // Preserve ALL original fields to ensure nothing is lost
        ...opportunity,
      };

      return transformedJob;
    } catch (error: any) {
      // Handle different error types
      if (error.name === "AbortError") {
        return rejectWithValue("Request timeout - please try again");
      }
      return rejectWithValue(error.message || "Failed to fetch job details");
    }
  }
);

/**
 * Redux slice for jobs state management
 *
 * This slice defines the reducers and actions for managing job state.
 * It uses Redux Toolkit's createSlice for simplified Redux logic.
 */
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    /**
     * Action to update the sort preference
     *
     * @param state - Current jobs state
     * @param action - Action with new sort preference
     */
    setSortBy: (state, action: PayloadAction<JobsState["sortBy"]>) => {
      state.sortBy = action.payload;
    },

    /**
     * Action to clear any error messages
     *
     * @param state - Current jobs state
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Action to clear the currently selected job
     * Used when navigating away from job detail pages
     *
     * @param state - Current jobs state
     */
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchJobs async thunk states
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle fetchJobById async thunk states
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
        state.error = null;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions for use in components
export const { setSortBy, clearError, clearCurrentJob } = jobsSlice.actions;

// Export reducer for store configuration
export default jobsSlice.reducer;

/**
 * Selector functions for accessing jobs state
 *
 * These selectors provide a clean interface for components
 * to access specific parts of the jobs state.
 */

// Basic selectors
export const selectJobs = (state: { jobs: JobsState }) => state.jobs.jobs;
export const selectCurrentJob = (state: { jobs: JobsState }) =>
  state.jobs.currentJob;
export const selectJobsLoading = (state: { jobs: JobsState }) =>
  state.jobs.loading;
export const selectJobsError = (state: { jobs: JobsState }) => state.jobs.error;
export const selectSortBy = (state: { jobs: JobsState }) => state.jobs.sortBy;

/**
 * Memoized selector for sorted jobs
 *
 * This selector applies the current sort preference to the jobs array
 * and returns a new sorted array. It's memoized for performance.
 *
 * @param state - Redux state containing jobs
 * @returns Sorted array of jobs based on current sort preference
 */
export const selectSortedJobs = (state: { jobs: JobsState }) => {
  const jobs = state.jobs.jobs;
  const sortBy = state.jobs.sortBy;

  // Helper function to safely parse dates
  const parseDate = (dateString: string) => new Date(dateString);

  // Apply sorting based on current preference
  switch (sortBy) {
    case "newest-first":
      // Sort by date posted, newest first
      return [...jobs].sort(
        (a, b) =>
          parseDate(b.datePosted).getTime() - parseDate(a.datePosted).getTime()
      );
    case "oldest-first":
      // Sort by date posted, oldest first
      return [...jobs].sort(
        (a, b) =>
          parseDate(a.datePosted).getTime() - parseDate(b.datePosted).getTime()
      );
    case "most-relevant":
    default:
      // Return jobs in their original order (API relevance)
      return jobs;
  }
};
