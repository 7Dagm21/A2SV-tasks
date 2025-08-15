"use client"

/**
 * Error State Components
 * Provides various error states for the application
 */

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  showRetry?: boolean
}

/**
 * General error message component with optional retry functionality
 */
export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
  showRetry = true,
}: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      {/* Error icon */}
      <div className="text-red-600 mb-4">
        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Error message */}
      <p className="text-red-700 mb-4">{message}</p>

      {/* Retry button */}
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

/**
 * Network error component for API failures
 */
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorMessage
      title="Network Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  )
}

/**
 * Job not found error component
 */
export function JobNotFoundError() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h3>
      </div>
      <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
    </div>
  )
}

/**
 * Empty state component when no jobs are available
 */
export function EmptyJobsState({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Available</h3>
      </div>
      <p className="text-gray-600 mb-6">There are currently no job opportunities available. Please check back later.</p>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Refresh Jobs
        </button>
      )}
    </div>
  )
}
