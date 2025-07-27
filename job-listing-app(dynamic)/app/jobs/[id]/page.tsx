/**
 * Job Detail Page Component
 *
 * This component displays detailed information about a specific job opportunity.
 * It fetches job details from the API using the job ID from the URL parameters.
 *
 * Features:
 * - Dynamic routing with job ID parameter
 * - Comprehensive job information display
 * - Loading states with skeleton components
 * - Error handling with retry functionality
 * - Responsive sidebar layout
 * - Back navigation to job listings
 *
 * The component uses Redux for state management and handles various
 * edge cases like invalid IDs, network errors, and missing data.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

"use client";

import { useEffect } from "react";
import { use } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchJobById,
  clearCurrentJob,
  clearError,
  selectCurrentJob,
  selectJobsLoading,
  selectJobsError,
} from "@/lib/features/opportunitySlice";

/**
 * Loading Skeleton Component for Job Details
 *
 * Displays placeholder content while job details are being fetched.
 * Maintains the same layout structure as the actual content to prevent
 * layout shifts when data loads.
 */
function JobDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description Section */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Responsibilities Section */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Error Message Component for Job Details
 *
 * Displays error messages with retry and navigation options when
 * job detail fetching fails. Provides user-friendly error handling.
 *
 * @param message - Error message to display
 * @param onRetry - Function to retry fetching the job
 * @param onGoBack - Function to navigate back to job listings
 */
function ErrorMessage({
  message,
  onRetry,
  onGoBack,
}: {
  message: string;
  onRetry: () => void;
  onGoBack: () => void;
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Job
          </h2>
          <p className="text-red-600 mb-6">{message}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onRetry}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onGoBack}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper function to safely extract job ID from Next.js params
 *
 * Next.js 13+ with app router can pass params as either a direct object
 * or a Promise. This function handles both cases safely.
 *
 * @param params - Next.js params object or Promise
 * @returns Job ID string or empty string if invalid
 */
function getParamsId(params: any): string {
  if (params && typeof params.then === "function") {
    // Handle Promise-based params (Next.js 13+ app router)
    const unwrappedParams = use(params) as { id: string };
    return unwrappedParams.id;
  } else if (params && typeof params === "object" && params.id) {
    // Handle direct object params
    return params.id;
  } else {
    // Invalid params structure
    return "";
  }
}

/**
 * TypeScript interface for component props
 *
 * Defines the expected props structure for the job detail page component.
 * Supports both direct params and Promise-based params for Next.js compatibility.
 */
interface PageProps {
  params: { id: string } | Promise<{ id: string }>;
}

/**
 * Main Job Detail Page Component
 *
 * This is the primary component that renders detailed job information.
 * It handles the complete user experience including loading, error,
 * and success states for individual job details.
 *
 * @param params - Next.js route parameters containing the job ID
 */
export default function JobDetailPage({ params }: PageProps) {
  // Extract job ID from route parameters
  const id = getParamsId(params);

  // Redux hooks for state management
  const dispatch = useAppDispatch();
  const job = useAppSelector(selectCurrentJob); // Current job details
  const loading = useAppSelector(selectJobsLoading); // Loading state
  const error = useAppSelector(selectJobsError); // Error state

  /**
   * Effect hook to fetch job details when component mounts or ID changes
   *
   * This runs when the component is first rendered or when the job ID
   * changes (e.g., navigating to a different job). It also cleans up
   * the current job when the component unmounts.
   */
  useEffect(() => {
    if (id) {
      // Fetch job details if we have a valid ID
      dispatch(fetchJobById(id));
    }

    // Cleanup function to clear current job when component unmounts
    return () => {
      dispatch(clearCurrentJob());
    };
  }, [dispatch, id]);

  /**
   * Handle retry functionality
   *
   * Clears any existing errors and re-attempts to fetch the job details.
   * This gives users a way to recover from network or server errors.
   */
  const handleRetry = () => {
    dispatch(clearError());
    if (id) {
      dispatch(fetchJobById(id));
    }
  };

  /**
   * Handle back navigation
   *
   * Uses browser's back functionality to return to the previous page.
   * This maintains the user's navigation history.
   */
  const handleGoBack = () => {
    window.history.back();
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

  // Handle case where no valid ID is provided
  if (!id) {
    return (
      <div className="min-h-screen py-12">
        <div className="bg-white min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Invalid Job ID
              </h2>
              <p className="text-gray-600 mb-6">
                The job ID is missing or invalid.
              </p>
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state - Show skeleton while fetching data
  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="bg-white min-h-screen">
          <JobDetailSkeleton />
        </div>
      </div>
    );
  }

  // Error state - Show error message when fetching fails
  if (error && !job) {
    return (
      <div className="min-h-screen py-12">
        <div className="bg-white min-h-screen">
          <ErrorMessage
            message={error}
            onRetry={handleRetry}
            onGoBack={handleGoBack}
          />
        </div>
      </div>
    );
  }

  // Not found state - Show when job doesn't exist
  if (!job && !loading && !error) {
    return (
      <div className="min-h-screen py-12">
        <div className="bg-white min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Job Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The job you're looking for doesn't exist or may have been
                removed.
              </p>
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Guard clause - Return null if no job data
  if (!job) {
    return null;
  }

  // Success state - Render job details
  return (
    <div className="min-h-screen py-12">
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Back Navigation Button */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back
            </Link>
          </div>

          {/* Main Content Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Job Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Description
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  {job.description && job.description.trim() ? (
                    <p>{job.description}</p>
                  ) : (
                    <p className="text-gray-500 italic">
                      No description available for this position.
                    </p>
                  )}
                </div>
              </div>

              {/* Responsibilities Section - Only show if data exists */}
              {job.responsibilities && job.responsibilities.trim() && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Responsibilities
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    {/* Split responsibilities by newlines and render as paragraphs */}
                    {job.responsibilities.split("\n").map((line, index) => (
                      <p key={index} className="mb-2">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideal Candidate Section - Only show if data exists */}
              {job.idealCandidate && job.idealCandidate.trim() && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Ideal Candidate we want
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    <div className="flex items-start gap-3">
                      {/* Bullet point indicator */}
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <p>{job.idealCandidate}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* When & Where Section - Only show if data exists */}
              {job.whenAndWhere && job.whenAndWhere.trim() && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    When & Where
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    <div className="flex items-start gap-3">
                      {/* Bullet point indicator */}
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <p>{job.whenAndWhere}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Job Metadata Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  About
                </h2>
                <div className="space-y-6">
                  {/* Posted Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-xs">📅</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted On</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(job.datePosted)}
                      </p>
                    </div>
                  </div>

                  {/* Application Deadline - Only show if exists */}
                  {job.deadline && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 text-xs">⏰</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Deadline</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(job.deadline)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Job Location */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs">📍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">
                        {/* Handle both string and array location formats */}
                        {Array.isArray(job.location)
                          ? job.location.join(", ")
                          : job.location}
                      </p>
                    </div>
                  </div>

                  {/* Start Date - Only show if exists and is valid */}
                  {job.startDate &&
                    job.startDate !== "0001-01-01T00:00:00Z" && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 text-xs">🚀</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="font-medium text-gray-900">
                            {formatDate(job.startDate)}
                          </p>
                        </div>
                      </div>
                    )}

                  {/* End Date - Only show if exists and is valid */}
                  {job.endDate && job.endDate !== "0001-01-01T00:00:00Z" && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 text-xs">🏁</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(job.endDate)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Job Categories Section - Only show if categories exist */}
                {job.categories &&
                  Array.isArray(job.categories) &&
                  job.categories.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Categories
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {job.categories.map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Required Skills Section - Only show if skills exist */}
                {job.requiredSkills &&
                  Array.isArray(job.requiredSkills) &&
                  job.requiredSkills.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Required Skills
                      </h3>
                      <div className="space-y-2">
                        {job.requiredSkills.map((skill, index) => (
                          <div key={index} className="text-gray-700 text-sm">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
