import * as React from "react";
import { cn } from "../../lib/utils"; // Utility to conditionally merge Tailwind classes

// Define props: inherits all standard HTML input attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Forward ref so parent components can control the input (e.g., focus, form libs)
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          // Basic styling + accessibility/focus/disabled states
          "w-full px-3 py-2 border border-gray-300 rounded-md " +
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
            "disabled:cursor-not-allowed disabled:opacity-50",
          className // allow overrides via className prop
        )}
        {...props} // Spread remaining props like placeholder, value, onChange, etc.
      />
    );
  }
);

Input.displayName = "Input"; // Helpful for debugging and dev tools
