/**
 * Loading Components
 * Provides various loading states for the application
 */

/**
 * General loading spinner component
 */
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">Loading...</span>
    </div>
  )
}

/**
 * Loading skeleton for job cards
 * Shows placeholder content while job data is being fetched
 */
export function JobCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
      <div className="flex gap-4">
        {/* Company logo skeleton */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0"></div>

        {/* Job content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Job title skeleton */}
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>

          {/* Company name skeleton */}
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>

          {/* Tags skeleton */}
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-18"></div>
          </div>

          {/* Posted date skeleton */}
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  )
}

/**
 * Loading state for multiple job cards
 * @param count - Number of skeleton cards to show
 */
export function JobListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }, (_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  )
}

/**
 * Loading skeleton for job details page
 */
export function JobDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column skeleton */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header skeleton */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-64"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
          </div>

          {/* Description skeleton */}
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded w-32"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          {/* Responsibilities skeleton */}
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded w-40"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-200 mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 space-y-6">
            <div className="h-5 bg-gray-200 rounded w-20"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
