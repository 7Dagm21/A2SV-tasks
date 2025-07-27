/**
 * Button Component
 *
 * A reusable button component with multiple variants and sizes.
 * Supports rendering as different HTML elements through the asChild prop.
 *
 * Features:
 * - Multiple visual variants (default, destructive, outline, etc.)
 * - Different sizes (default, small, large, icon)
 * - asChild prop for rendering as different elements (e.g., Link)
 * - Full TypeScript support with proper prop types
 * - Accessible with proper focus states
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Button variant and size configurations
 *
 * These objects define the Tailwind CSS classes for different
 * button appearances and sizes. This approach provides consistency
 * and makes it easy to maintain styling across the application.
 */
const buttonVariants = {
  variant: {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "hover:bg-gray-100",
    link: "text-blue-600 underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  },
};

/**
 * TypeScript interface for Button component props
 *
 * Extends the standard HTML button attributes and adds our custom props.
 * This ensures type safety and provides IntelliSense support in IDEs.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean; // When true, renders children with button styles instead of button element
  variant?: keyof typeof buttonVariants.variant; // Visual variant
  size?: keyof typeof buttonVariants.size; // Size variant
}

/**
 * Button Component
 *
 * A flexible button component that can render as a button element or
 * apply button styling to child elements (when asChild is true).
 *
 * @param className - Additional CSS classes to apply
 * @param variant - Visual style variant
 * @param size - Size variant
 * @param asChild - Whether to render as child element with button styles
 * @param children - Button content or child elements
 * @param props - Additional HTML button attributes
 * @param ref - React ref for the button element
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    // Base classes that apply to all button variants
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    // Get variant-specific classes
    const variantClasses = buttonVariants.variant[variant];

    // Get size-specific classes
    const sizeClasses = buttonVariants.size[size];

    // Combine all classes using our utility function
    const buttonClasses = cn(
      baseClasses,
      variantClasses,
      sizeClasses,
      className
    );

    // If asChild is true, clone the first child and add button classes
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...children.props,
        className: cn(buttonClasses, children.props.className),
        ref,
      });
    }

    // Otherwise render as a regular button element
    return (
      <button className={buttonClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

// Set display name for React DevTools
Button.displayName = "Button";

export { Button };
