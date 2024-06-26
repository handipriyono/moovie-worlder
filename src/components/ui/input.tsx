import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string; // Add the 'errorMessage' property
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            errorMessage && "border border-red-500 bg-black"
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className=" text-red-600 text-xs py-0 my-0">{errorMessage}</p>
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
