import * as React from "react";
import { cn } from "../../lib/utils"; // Utility to combine class names

// Extends all native <label> props
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

// Label component using forwardRef for better integration with forms
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          // Tailwind base style for labels
          "block text-sm font-medium text-gray-700",
          className // merge additional className if passed
        )}
        {...props} // Spread any other props like htmlFor, children, etc.
      />
    );
  }
);

Label.displayName = "Label"; // For dev tools/debugging
