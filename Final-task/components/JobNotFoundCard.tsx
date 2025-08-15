"use client"

/**
 * Job Not Found Card Component
 * Displays when a job is not found or doesn't exist
 */

import Link from "next/link"
import { FileX, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JobNotFoundCardProps {
  jobId?: string
  message?: string
  showBackButton?: boolean
}

export function JobNotFoundCard({
  jobId,
  message = "The job you're looking for doesn't exist or has been removed.",
  showBackButton = true,
}: JobNotFoundCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center" data-testid="job-not-found-card">
      {/* Icon */}
      <div className="text-gray-400 mb-4">
        <FileX className="w-16 h-16 mx-auto mb-4" data-testid="not-found-icon" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid="not-found-title">
          Job Not Found
        </h3>
      </div>

      {/* Message */}
      <p className="text-gray-600 mb-6 max-w-md mx-auto" data-testid="not-found-message">
        {message}
      </p>

      {/* Job ID if provided */}
      {jobId && (
        <p className="text-sm text-gray-500 mb-6" data-testid="job-id">
          Job ID: {jobId}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {showBackButton && (
          <Link href="/" data-testid="back-to-jobs-link">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        )}

        <Link href="/" data-testid="browse-jobs-link">
          <Button>Browse All Jobs</Button>
        </Link>
      </div>

      {/* Additional Help */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500" data-testid="help-text">
          Need help? Contact our support team or try searching for similar positions.
        </p>
      </div>
    </div>
  )
}
