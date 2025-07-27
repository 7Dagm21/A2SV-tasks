/**
 * Badge Component
 *
 * A small, rounded component for displaying tags, categories, status
 * indicators, or other short pieces of information. Supports multiple
 * visual variants for different use cases.
 *
 * Features:
 * - Multiple visual variants (default, secondary, destructive, outline)
 * - Consistent sizing and typography
 * - Accessible with proper contrast ratios
 * - Easy to customize with additional classes
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Badge variant configurations
 *
 * Defines the Tailwind CSS classes for different badge appearances.
 * Each variant has specific colors and hover states for consistency.
 */
const badgeVariants = {
  variant: {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-900",
  },
};

/**
 * TypeScript interface for Badge component props
 *
 * Extends standard HTML div attributes and adds our custom variant prop.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants.variant;
}

/**
 * Badge Component
 *
 * Renders a small, styled badge with the specified variant.
 * Uses a div element to allow for flexible content and styling.
 *
 * @param className - Additional CSS classes to apply
 * @param variant - Visual style variant
 * @param props - Additional HTML div attributes
 */
function Badge({ className, variant = "default", ...props }: BadgeProps) {
  // Base classes that apply to all badge variants
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  // Get variant-specific classes
  const variantClasses = badgeVariants.variant[variant];

  return (
    <div className={cn(baseClasses, variantClasses, className)} {...props} />
  );
}

export { Badge };
