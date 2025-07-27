/**
 * Home Page Component - Job Opportunities Listing
 *
 * This is the main landing page that displays a list of job opportunities
 * fetched from the API. It includes:
 * - Job cards with company logos, titles, and descriptions
 * - Sorting functionality (most relevant, newest, oldest)
 * - Loading states with skeleton components
 * - Error handling with retry functionality
 * - Responsive design for all screen sizes
 *
 * The component uses Redux for state management and integrates with
 * the jobs API through async thunks.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchJobs,
  setSortBy,
  clearError,
  selectSortedJobs,
  selectJobsLoading,
  selectJobsError,
  selectSortBy,
} from "@/lib/features/opportunitySlice";

/**
 * Utility function to generate consistent company logo colors
 *
 * This function maps company names to specific colors for visual consistency.
 * When a company logo is not available, we show colored initials instead.
 *
 * @param company - Company name
 * @returns Tailwind CSS background color class
 */
const getCompanyLogoColor = (company: string) => {
  const colorMap: { [key: string]: string } = {
    "ABC Media": "bg-yellow-500",
    "Tech Innovators": "bg-blue-500",
    "Creative Designs Co.": "bg-purple-500",
    "Data Insights Inc.": "bg-green-500",
    "Customer Care Ltd.": "bg-red-500",
  };
  // Return mapped color or default gray for unknown companies
  return colorMap[company] || "bg-gray-500";
};

/**
 * Loading Skeleton Component
 *
 * Displays a placeholder card while job data is being fetched.
 * This prevents layout shift and provides visual feedback to users.
 * Uses CSS animations to create a "pulse" effect.
 */
function JobCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
      <div className="flex gap-4">
        {/* Company logo placeholder */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0"></div>
        <div className="flex-1">
          {/* Job title placeholder */}
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          {/* Company name placeholder */}
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          {/* Description placeholder */}
          <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
          {/* Tags placeholder */}
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Error Message Component
 *
 * Displays error messages with retry functionality when API requests fail.
 * Provides user-friendly error messages and actionable retry buttons.
 *
 * @param message - Error message to display
 * @param onRetry - Function to call when retry button is clicked
 */
function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Error Loading Jobs
        </h2>
        <p className="text-red-600 mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

/**
 * Main Landing Page Component
 *
 * This is the primary component that renders the job opportunities listing.
 * It manages the complete user experience including loading, error, and
 * success states.
 */
export default function LandingPage() {
  // Redux hooks for state management
  const dispatch = useAppDispatch();
  const sortedJobs = useAppSelector(selectSortedJobs); // Get jobs with current sorting applied
  const loading = useAppSelector(selectJobsLoading); // Loading state for UI feedback
  const error = useAppSelector(selectJobsError); // Error state for error handling
  const sortBy = useAppSelector(selectSortBy); // Current sort preference

  /**
   * Effect hook to fetch jobs when component mounts
   *
   * This runs once when the component is first rendered and triggers
   * the API call to fetch job opportunities.
   */
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  /**
   * Handle sort preference changes
   *
   * Updates the Redux state with the new sort preference, which
   * automatically re-sorts the displayed jobs through the selector.
   *
   * @param newSortBy - New sort preference selected by user
   */
  const handleSortChange = (newSortBy: typeof sortBy) => {
    dispatch(setSortBy(newSortBy));
  };

  /**
   * Handle retry functionality
   *
   * Clears any existing errors and re-attempts to fetch jobs from the API.
   * This gives users a way to recover from network or server errors.
   */
  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchJobs());
  };

  /**
   * Format date strings for display
   *
   * Converts ISO date strings from the API into user-friendly format.
   * Includes error handling for invalid date strings.
   *
   * @param dateString - ISO date string from API
   * @returns Formatted date string or original string if parsing fails
   */
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      // Return original string if date parsing fails
      return dateString;
    }
  };

  return (
    <div className="min-h-screen py-12">
      {/* Main Content Container */}
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto py-12">
          {/* Page Header with Title and Sort Controls */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Opportunities
              </h1>
              <p className="text-gray-500 text-sm">
                {loading
                  ? "Loading..."
                  : `Showing ${sortedJobs.length} results`}
              </p>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                className="text-sm border border-gray-300 rounded px-2 py-1"
                value={sortBy}
                onChange={(e) =>
                  handleSortChange(e.target.value as typeof sortBy)
                }
                disabled={loading} // Disable during loading
              >
                <option value="most-relevant">Most relevant</option>
                <option value="newest-first">Newest first</option>
                <option value="oldest-first">Oldest first</option>
              </select>
            </div>
          </div>

          {/* Error State - Show when there's an error and not loading */}
          {error && !loading && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {/* Loading State - Show skeleton cards while fetching data */}
          {loading && (
            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Empty State - Show when no jobs are available */}
          {!loading && !error && sortedJobs.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No opportunities found
              </h2>
              <p className="text-gray-500 mb-4">
                There are currently no job opportunities available. Please check
                back later.
              </p>
              <button
                onClick={handleRetry}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          )}

          {/* Success State - Show job cards when data is loaded */}
          {!loading && !error && sortedJobs.length > 0 && (
            <div className="space-y-6">
              {sortedJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Company Logo Section */}
                    <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
                      {/* Try to show company logo image first */}
                      {job.logoUrl ? (
                        <img
                          src={job.logoUrl || "/placeholder.svg"}
                          alt={`${job.orgName} logo`}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            // Hide the image and show fallback if loading fails
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget
                              .nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}

                      {/* Fallback: Company initials with color coding */}
                      <div
                        className={`w-full h-full rounded-full ${
                          job.logoUrl ? "hidden" : "flex"
                        } items-center justify-center ${getCompanyLogoColor(
                          job.orgName
                        )}`}
                      >
                        <span className="text-white text-xl font-bold">
                          {/* Generate initials from company name */}
                          {job.orgName
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                    </div>

                    {/* Job Content Section */}
                    <div className="flex-1">
                      <div className="mb-2">
                        {/* Job Title - Clickable link to detail page */}
                        <Link
                          href={`/jobs/${job.id}`}
                          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {job.title}
                        </Link>

                        {/* Company name and location */}
                        <p className="text-gray-600 text-sm mt-1">
                          {job.orgName} • {job.location}
                        </p>
                      </div>

                      {/* Job Description - Truncated to 3 lines */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                        {job.description}
                      </p>

                      {/* Job Tags/Categories */}
                      <div className="flex gap-2 flex-wrap">
                        {/* Job Type Tag */}
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500 text-white">
                          {job.opType}
                        </span>

                        {/* Category Tags - Show first 3 with color coding */}
                        {job.categories
                          .slice(0, 3)
                          .map((category, catIndex) => (
                            <span
                              key={catIndex}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                category === "Marketing" ||
                                category === "Design" ||
                                category === "Art"
                                  ? "bg-yellow-500 text-white"
                                  : category === "IT" ||
                                    category === "Development"
                                  ? "bg-gray-500 text-white"
                                  : category === "Data Science" ||
                                    category === "Analytics"
                                  ? "bg-blue-500 text-white"
                                  : "bg-purple-500 text-white"
                              }`}
                            >
                              {category}
                            </span>
                          ))}

                        {/* Show count of additional categories if more than 3 */}
                        {job.categories.length > 3 && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-300 text-gray-700">
                            +{job.categories.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Posted Date */}
                      <p className="text-xs text-gray-500 mt-2">
                        Posted on {formatDate(job.datePosted)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
