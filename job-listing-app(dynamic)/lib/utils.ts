/**
 * Utility Functions
 *
 * This module contains common utility functions used throughout the application.
 * Currently includes a className merging function for conditional styling.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

/**
 * Conditionally join class names
 *
 * This function takes multiple class name inputs and combines them into a single
 * string, filtering out falsy values. It's used throughout the UI components
 * for conditional styling based on props or state.
 *
 * Examples:
 * - cn("base-class", isActive && "active-class")
 * - cn("btn", variant === "primary" && "btn-primary", className)
 *
 * @param inputs - Array of class name strings, booleans, null, or undefined
 * @returns Combined class name string with falsy values filtered out
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
