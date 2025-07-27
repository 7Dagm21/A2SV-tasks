/**
 * This component is part of Next.js's automatic error handling system
 * and doesn't require manual routing setup.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

import Link from "next/link";

/**
 * Not Found Page Component
 *
 * Displays a 404 error page when users navigate to non-existent routes.
 * The component provides clear feedback about the error and offers
 * actionable options for users to continue their journey.
 *
 * Design principles:
 * - Clear visual hierarchy with large 404 number
 * - Friendly, helpful messaging instead of technical jargon
 * - Multiple recovery options for different user intentions
 * - Consistent branding and styling with the main application
 *
 * @returns JSX element displaying the 404 error page
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        {/* Error Display Section */}
        <div className="space-y-2">
          {/* Large 404 Number - Visual Impact */}
          <h1 className="text-6xl font-bold text-gray-400">404</h1>

          {/* Primary Error Message */}
          <h2 className="text-2xl font-semibold">Opportunity Not Found</h2>

          {/* Explanatory Text */}
          <p className="text-gray-600">
            The job opportunity you're looking for doesn't exist or may have
            been removed.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Primary Action - Back to Main Listings */}
          <Link
            href="/"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>←</span>
            Back to Opportunities
          </Link>

          {/* Secondary Action - Browse All Jobs */}
          <Link
            href="/"
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <span>🔍</span>
            Browse All Jobs
          </Link>
        </div>

        {/* Additional Help Text */}
        <div className="text-sm text-gray-500 mt-8">
          <p>
            If you believe this is an error, please{" "}
            <a
              href="mailto:support@jobportal.com"
              className="text-blue-600 hover:underline"
            >
              contact our support team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}



