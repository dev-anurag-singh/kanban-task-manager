import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[112px] w-full rounded-md border bg-transparent px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:border-primary  focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
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
Textarea.displayName = "Textarea";

export { Textarea };
