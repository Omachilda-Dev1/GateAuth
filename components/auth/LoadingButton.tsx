"use client";

import { cn } from "@/lib/utils";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function LoadingButton({
  loading,
  children,
  className,
  disabled,
  variant = "primary",
  ...props
}: LoadingButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      disabled={loading || disabled}
      className={cn(
        "w-full h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold",
        "transition-all duration-150 outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3D827E]",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        "active:scale-[0.98]",
        className
      )}
      style={
        isPrimary
          ? {
              background: loading || disabled ? "#4BA19C" : "#3D827E",
              color: "#FFFFFF",
            }
          : {
              background: "transparent",
              border: "1.5px solid #C2E3E1",
              color: "#2D605C",
            }
      }
      onMouseEnter={(e) => {
        if (!loading && !disabled && isPrimary) {
          e.currentTarget.style.background = "#2D605C";
        }
      }}
      onMouseLeave={(e) => {
        if (!loading && !disabled && isPrimary) {
          e.currentTarget.style.background = "#3D827E";
        }
      }}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
}
