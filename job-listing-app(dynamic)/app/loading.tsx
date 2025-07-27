/**
 * Global Loading Component
 *
 * This component is automatically displayed by Next.js while pages are loading
 * in the app router. It provides visual feedback to users during navigation
 * and data fetching operations, preventing blank screens and improving UX.
 *
 * Features:
 * - Skeleton loading animation for job listings
 * - Consistent layout structure to prevent layout shifts
 * - Responsive design matching the main application
 * - Smooth animations using CSS transitions
 * - Accessibility-friendly loading indicators
 *
 * This component is part of Next.js's automatic loading UI system and
 * is shown during route transitions and initial page loads.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

/**
 * Global Loading Page Component
 *
 * Displays a skeleton loading interface that matches the structure of
 * the main job listings page. This prevents layout shifts when the
 * actual content loads and provides immediate visual feedback.
 *
 * The skeleton structure includes:
 * - Header section with title and description placeholders
 * - Grid of job card skeletons matching the real layout
 * - Animated pulse effects to indicate loading state
 * - Proper spacing and sizing to match actual content
 *
 * @returns JSX element displaying the loading skeleton interface
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section Skeleton */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          {/* Page Title Skeleton */}
          <div className="h-8 w-64 mb-2 bg-gray-200 rounded animate-pulse"></div>

          {/* Page Description Skeleton */}
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8">
        {/* Job Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generate 6 skeleton cards to match typical loading state */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 border rounded-lg">
              <div className="p-6">
                {/* Job Title Skeleton */}
                <div className="h-6 w-3/4 mb-4 bg-gray-200 rounded animate-pulse"></div>

                {/* Company Name Skeleton */}
                <div className="h-4 w-1/2 mb-2 bg-gray-200 rounded animate-pulse"></div>

                {/* Job Description Skeleton - Multiple lines */}
                <div className="h-4 w-full mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 mb-4 bg-gray-200 rounded animate-pulse"></div>

                {/* Action Buttons Skeleton */}
                <div className="flex gap-2">
                  <div className="h-8 flex-1 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
