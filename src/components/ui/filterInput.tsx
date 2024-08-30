"use client";
import * as React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FilterInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [value, setValue] = useState("");
    const [hasValue, setHasValue] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      setHasValue(!!newValue);
    };

    const handleClear = () => {
      setValue("");
      setHasValue(false);
    };

    return (
      <div className="relative">
        <input
          id="input"
          type={type}
          className={cn(
            "flex h-10 w-full border border-custom-primary bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
          value={value}
          onChange={handleInputChange}
        />
        {hasValue && (
          <button
            type="button"
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center hover:text-custom-secondary"
            aria-label="Clear input value"
            onClick={handleClear}
          >
            X
          </button>
        )}
      </div>
    );
  },
);
FilterInput.displayName = "Input";

export { FilterInput };
