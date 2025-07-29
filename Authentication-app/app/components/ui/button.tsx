import * as React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

// Reusable Button component using TailwindCSS styles
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    // Common base styles for all buttons
    const baseClass =
      "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    // Variant-specific styles (outline or default)
    const variantClass =
      variant === "outline"
        ? "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-blue-500"
        : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";

    return (
      <button
        ref={ref}
        className={cn(baseClass, variantClass, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Set display name for better debugging & dev tools
Button.displayName = "Button";
