"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, hint, icon, rightElement, className, id, ...props }, ref) => {
    const inputId = id ?? `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium select-none"
          style={{ color: "#1C3D3B" }}
        >
          {label}
        </label>

        <div className="relative flex items-center">
          {icon && (
            <span
              className="absolute left-3.5 pointer-events-none flex items-center"
              style={{ color: hasError ? "#DC2626" : "#4BA19C" }}
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={cn(
              "w-full h-11 rounded-lg border text-sm transition-all duration-150 outline-none",
              "placeholder:text-[#7A9E9C]",
              icon ? "pl-10" : "pl-3.5",
              rightElement ? "pr-11" : "pr-3.5",
              hasError
                ? "border-[#DC2626] bg-[#FEF2F2] focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                : "border-[#C2E3E1] bg-white focus:ring-2 focus:ring-[#3D827E]/20 focus:border-[#3D827E]",
              "text-[#0E1E1D]",
              className
            )}
            {...props}
          />

          {rightElement && (
            <span className="absolute right-3 flex items-center">{rightElement}</span>
          )}
        </div>

        {hasError && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: "#DC2626" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
              <path d="M6 3.5v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {error}
          </p>
        )}

        {hint && !hasError && (
          <p id={`${inputId}-hint`} className="text-xs" style={{ color: "#7A9E9C" }}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
