"use client"

/**
 * Enhanced Job Card Component with Bookmark Functionality
 * Displays job information with bookmark toggle button
 */

import { useState } from "react"
import Link from "next/link"
import { BookmarkButton } from "./BookmarkButton"
import type { TransformedJob } from "../types/api"

interface JobCardProps {
  job: TransformedJob
  onAuthRequired?: () => void
  showBookmark?: boolean
}

export function JobCard({ job, onAuthRequired, showBookmark = true }: JobCardProps) {
  const [imageError, setImageError] = useState(false)

  /**
   * Generate consistent company logo colors based on company name
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

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 relative"
      data-testid="job-card"
    >
      {/* Bookmark Button - Top Right */}
      {showBookmark && (
        <div className="absolute top-4 right-4">
          <BookmarkButton jobId={job.id} size="sm" onAuthRequired={onAuthRequired} data-testid="bookmark-button" />
        </div>
      )}

      <div className="flex gap-4 pr-12">
        {/* Company Logo Avatar */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
          {/* Try to load company logo */}
          <img
            src={job.image || "/placeholder.svg"}
            alt={`${job.company} logo`}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              setImageError(true)
              e.currentTarget.style.display = "none"
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = "flex"
            }}
            data-testid="company-logo"
          />

          {/* Fallback: Company initials with consistent colors */}
          <div
            className={`w-full h-full rounded-full ${
              imageError ? "flex" : "hidden"
            } items-center justify-center ${getCompanyLogoColor(job.company)}`}
            data-testid="company-avatar"
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

        {/* Job Content */}
        <div className="flex-1">
          {/* Job title and company */}
          <div className="mb-2">
            <Link
              href={`/jobs/${job.id}`}
              className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              data-testid="job-title"
            >
              {job.title}
            </Link>
            <p className="text-gray-600 text-sm mt-1" data-testid="job-company">
              {job.company} • {job.about.location}
            </p>
          </div>

          {/* Job description */}
          <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3" data-testid="job-description">
            {job.description}
          </p>

          {/* Category tags */}
          <div className="flex gap-2 flex-wrap mb-3" data-testid="job-categories">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500 text-white">In Person</span>
            {job.about.categories.slice(0, 3).map((category, catIndex) => (
              <span
                key={catIndex}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  category.toLowerCase().includes("marketing") ||
                  category.toLowerCase().includes("design") ||
                  category.toLowerCase().includes("creative")
                    ? "bg-yellow-500 text-white"
                    : category.toLowerCase().includes("tech") ||
                        category.toLowerCase().includes("development") ||
                        category.toLowerCase().includes("software")
                      ? "bg-blue-500 text-white"
                      : category.toLowerCase().includes("data") || category.toLowerCase().includes("analytics")
                        ? "bg-green-500 text-white"
                        : "bg-purple-500 text-white"
                }`}
              >
                {category}
              </span>
            ))}
          </div>

          {/* Job metadata */}
          <div className="flex justify-between items-center text-xs text-gray-500" data-testid="job-metadata">
            <span>Posted: {job.about.posted_on}</span>
            <div className="flex gap-4">
              <span>{job.applicantsCount} applicants</span>
              <span>{job.viewsCount} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
