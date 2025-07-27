/**
 * Skeleton Component
 *
 * A loading placeholder component that displays animated placeholders
 * while content is being fetched. Helps prevent layout shifts and
 * provides visual feedback to users during loading states.
 *
 * Features:
 * - Smooth pulse animation
 * - Customizable dimensions through className
 * - Consistent styling with the design system
 * - Accessible (doesn't interfere with screen readers)
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton Component
 *
 * Renders an animated placeholder div that can be sized and positioned
 * to match the content that will eventually load. The pulse animation
 * provides visual feedback that content is loading.
 *
 * Usage examples:
 * - <Skeleton className="h-4 w-full" /> for text lines
 * - <Skeleton className="h-12 w-12 rounded-full" /> for avatars
 * - <Skeleton className="h-32 w-full" /> for image placeholders
 *
 * @param className - CSS classes for sizing and positioning
 * @param props - Additional HTML div attributes
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
