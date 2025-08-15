"use client"

/**
 * Enhanced Job Details Page with Bookmark Functionality
 * Displays detailed job information with bookmark toggle for authenticated users
 */

import Link from "next/link"
import { useJobById } from "../../../hooks/useJobById"
import { useAuth } from "../../../contexts/AuthContext"
import { JobDetailsSkeleton } from "../../../components/loading-states"
import { ErrorMessage } from "../../../components/error-states"
import { JobNotFoundCard } from "../../../components/JobNotFoundCard"
import { BookmarkButton } from "../../../components/BookmarkButton"
import { AuthModal } from "../../../components/auth/AuthModal"
import { Button } from "@/components/ui/button"
import { User, LogOut, ArrowLeft } from "lucide-react"
import { useState } from "react"

/**
 * Generate consistent company logo colors
 */
const getCompanyLogoColor = (company: string) => {
  const hash = company.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ]

  return colors[Math.abs(hash) % colors.length]
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  // State management
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  // Hooks
  const { job, loading, error, refetch } = useJobById(params.id)
  const { user, isAuthenticated, logout } = useAuth()

  /**
   * Handle authentication requirement
   */
  const handleAuthRequired = () => {
    setAuthMode("login")
    setShowAuthModal(true)
  }

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout()
  }

  // Show loading state while fetching job details
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <nav className="bg-white shadow-sm mb-8">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
                Job Portal
              </Link>
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <JobDetailsSkeleton />
          </div>
        </div>
      </div>
    )
  }

  // Show error state if API request failed
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <nav className="bg-white shadow-sm mb-8">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
                Job Portal
              </Link>
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-12">
            {error.includes("not found") ? (
              <JobNotFoundCard jobId={params.id} />
            ) : (
              <ErrorMessage title="Failed to Load Job Details" message={error} onRetry={refetch} />
            )}

            <div className="mt-8 text-center">
              <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Job List
              </Link>
            </div>
          </div>
        </div>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultMode={authMode} />
      </div>
    )
  }

  // Show job not found if no job data
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <nav className="bg-white shadow-sm mb-8">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
                Job Portal
              </Link>
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <JobNotFoundCard jobId={params.id} />
          </div>
        </div>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultMode={authMode} />
      </div>
    )
  }

  // Main render with job details
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* Navigation */}
      <nav className="bg-white shadow-sm mb-8">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
              Job Portal
            </Link>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
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
                      setAuthMode("login")
                      setShowAuthModal(true)
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setAuthMode("register")
                      setShowAuthModal(true)
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
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Header with Company Avatar and Bookmark */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
                    {/* Company logo */}
                    <img
                      src={job.image || "/placeholder.svg"}
                      alt={`${job.company} logo`}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement
                        if (fallback) fallback.style.display = "flex"
                      }}
                    />

                    {/* Fallback avatar */}
                    <div
                      className={`w-full h-full rounded-full hidden items-center justify-center ${getCompanyLogoColor(job.company)}`}
                    >
                      <span className="text-white text-xl font-bold">
                        {job.company
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Job title and company info */}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <p className="text-gray-600">
                      {job.company} • {job.about.location}
                    </p>
                    <div className="flex gap-4 mt-1 text-sm text-gray-500">
                      <span>{job.applicantsCount} applicants</span>
                      <span>{job.viewsCount} views</span>
                    </div>
                  </div>
                </div>

                {/* Bookmark Button */}
                <BookmarkButton jobId={job.id} size="lg" showText={true} onAuthRequired={handleAuthRequired} />
              </div>

              {/* Authentication Banner for Non-authenticated Users */}
              {!isAuthenticated && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-blue-800 font-medium">Sign in to bookmark this job</h3>
                      <p className="text-blue-600 text-sm">
                        Create an account to save this opportunity and apply later.
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setAuthMode("register")
                        setShowAuthModal(true)
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              )}

              {/* Job Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</div>
              </div>

              {/* Responsibilities */}
              {job.responsibilities.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ideal Candidate */}
              {job.ideal_candidate.traits.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Ideal Candidate</h2>
                  <div className="space-y-4">
                    {job.ideal_candidate.traits.map((trait, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* When & Where */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">When & Where</h2>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{job.when_where}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Job Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">About</h2>

                <div className="space-y-6">
                  {/* Posted On */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm">📅</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted On</p>
                      <p className="font-medium text-gray-900">{job.about.posted_on}</p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-sm">⏰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-medium text-gray-900">{job.about.deadline}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm">📍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{job.about.location}</p>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 text-sm">🚀</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium text-gray-900">{job.about.start_date}</p>
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 text-sm">🏁</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium text-gray-900">{job.about.end_date}</p>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                {job.about.categories.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="flex gap-2 flex-wrap">
                      {job.about.categories.map((category, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            category.toLowerCase().includes("marketing") ||
                            category.toLowerCase().includes("design") ||
                            category.toLowerCase().includes("creative")
                              ? "bg-yellow-100 text-yellow-800"
                              : category.toLowerCase().includes("tech") ||
                                  category.toLowerCase().includes("development") ||
                                  category.toLowerCase().includes("software")
                                ? "bg-blue-100 text-blue-800"
                                : category.toLowerCase().includes("data") ||
                                    category.toLowerCase().includes("analytics")
                                  ? "bg-green-100 text-green-800"
                                  : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Required Skills */}
                {job.about.required_skills.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                    <div className="space-y-2">
                      {job.about.required_skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                          <span className="text-gray-700 text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Job List
            </Link>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultMode={authMode} />
    </div>
  )
}
