import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input/25 bg-transparent px-4 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
            {
              "border-destructive focus-visible:border-destructive": error,
            },
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div
            aria-live="polite"
            className="absolute bottom-2 right-2 top-2 bg-transparent  px-2 text-base text-destructive"
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
