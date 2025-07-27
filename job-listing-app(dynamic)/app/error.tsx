/**

 * This component is automatically used by Next.js when errors occur
 * in the application. It's part of the app directory's error handling system.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

"use client";

import { useEffect } from "react";

/**
 * TypeScript interface for error boundary props
 *
 * Defines the props that Next.js passes to the error boundary component.
 * These props provide error information and recovery functionality.
 */
interface ErrorProps {
  error: Error & { digest?: string }; // Error object with optional digest for tracking
  reset: () => void; // Function to attempt recovery from the error
}

/**
 * Global Error Boundary Component
 *
 * This component is displayed when an unhandled error occurs anywhere
 * in the application. It provides a user-friendly interface for error
 * recovery and ensures the app doesn't completely break.
 *
 * The "use client" directive is required because:
 * - Error boundaries need to use React hooks (useEffect)
 * - Error handling requires client-side JavaScript
 * - The reset function needs to be interactive
 *
 * @param error - The error object containing details about what went wrong
 * @param reset - Function to attempt to recover from the error
 * @returns JSX element displaying error information and recovery options
 */
export default function Error({ error, reset }: ErrorProps) {
  /**
   * Effect hook to log errors for debugging
   *
   * This runs when the component mounts or when the error changes.
   * It logs the error to the console for development debugging and
   * could be extended to send error reports to monitoring services.
   */
  useEffect(() => {
    // Log error details for debugging
    console.error("Application error:", error);

    // In production, you might want to send error reports to a service:
    // errorReportingService.captureException(error)
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        {/* Error Icon and Title */}
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto text-red-500 text-4xl">⚠️</div>
          <h1 className="text-2xl font-semibold">Something went wrong!</h1>
          <p className="text-gray-600">
            We encountered an unexpected error. Please try again or contact
            support if the problem persists.
          </p>
        </div>

        {/* Recovery Action Button */}
        <button
          onClick={reset}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>🔄</span>
          Try Again
        </button>

        {/* Development Error Details */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
              {error.message}
              {error.stack && `\n\nStack trace:\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
