"use client";

/**
 * Enhanced Main Landing Page with Authentication and Bookmark Functionality
 * Displays job opportunities with bookmark features for authenticated users
 */

import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { useAuth } from "../contexts/AuthContext";
import { JobListSkeleton } from "../components/loading-states";
import { ErrorMessage, EmptyJobsState } from "../components/error-states";
import { JobCard } from "../components/JobCard";
import { AuthModal } from "../components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import { User, LogOut, Search } from "lucide-react";

export default function LandingPage() {
  // State management
  const [sortBy, setSortBy] = useState("most-relevant");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // Hooks
  const { jobs, loading, error, refetch, isEmpty } = useJobs();
  const { user, isAuthenticated, logout } = useAuth();

  /**
   * Parse date strings to Date objects for sorting
   */
  const parseDate = (dateString: string) => {
    return new Date(dateString);
  };

  /**
   * Filter jobs based on search term
   */
  const getFilteredJobs = () => {
    if (!searchTerm.trim()) return jobs;

    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.about.categories.some((category) =>
          category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  };

  /**
   * Sort filtered jobs based on selected option
   */
  const getSortedJobs = () => {
    const filteredJobs = getFilteredJobs();
    if (!filteredJobs.length) return [];

    const jobsCopy = [...filteredJobs];

    switch (sortBy) {
      case "newest-first":
        return jobsCopy.sort(
          (a, b) =>
            parseDate(b.about.posted_on).getTime() -
            parseDate(a.about.posted_on).getTime()
        );
      case "oldest-first":
        return jobsCopy.sort(
          (a, b) =>
            parseDate(a.about.posted_on).getTime() -
            parseDate(b.about.posted_on).getTime()
        );
      case "most-relevant":
      default:
        return jobsCopy;
    }
  };

  const sortedJobs = getSortedJobs();

  /**
   * Handle authentication requirement
   */
  const handleAuthRequired = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <nav className="bg-white shadow-sm mb-8">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">Job Portal</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" disabled>
                  Loading...
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Opportunities
                </h1>
                <p className="text-gray-500 text-sm">
                  Loading job opportunities from API...
                </p>
              </div>
            </div>
            <JobListSkeleton count={5} />
          </div>
        </div>
      </div>
    );
  }

  // Show error state if API request failed
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <nav className="bg-white shadow-sm mb-8">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">Job Portal</h1>
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      Welcome, {user?.name}
                    </span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    data-testid="open-auth"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <ErrorMessage
              title="Failed to Load Jobs"
              message={error}
              onRetry={refetch}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no jobs available
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <nav className="bg-white shadow-sm mb-8">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">Job Portal</h1>
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      Welcome, {user?.name}
                    </span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    data-testid="open-auth"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <EmptyJobsState onRefresh={refetch} />
          </div>
        </div>
      </div>
    );
  }

  // Main render with job data (wrapped in AuthGate to require authentication first)
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Navigation */}
      <nav className="bg-white shadow-sm mb-8">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Job Portal</h1>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.name}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAuthMode("login");
                      setShowAuthModal(true);
                    }}
                    data-testid="open-auth"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setAuthMode("register");
                      setShowAuthModal(true);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header with Title, Search, and Sort Options */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Opportunities
                </h1>
                <p className="text-gray-500 text-sm">
                  Showing {sortedJobs.length} of {jobs.length} results from API
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="most-relevant">Most relevant</option>
                  <option value="newest-first">Newest first</option>
                  <option value="oldest-first">Oldest first</option>
                </select>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Authentication Status Banner */}
          {!isAuthenticated && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-blue-800 font-medium">
                    Sign in to bookmark jobs
                  </h3>
                  <p className="text-blue-600 text-sm">
                    Create an account to save your favorite job opportunities
                    and apply later.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setAuthMode("register");
                    setShowAuthModal(true);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}

          {/* Job Cards */}
          <div className="space-y-6" data-testid="job-cards">
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onAuthRequired={handleAuthRequired}
                  showBookmark={true}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  {searchTerm
                    ? `No jobs found matching "${searchTerm}"`
                    : "No job opportunities found."}
                </p>
                {searchTerm && (
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Refresh button */}
          <div className="mt-8 text-center">
            <Button onClick={refetch} variant="outline">
              Refresh Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </div>
  );
}
