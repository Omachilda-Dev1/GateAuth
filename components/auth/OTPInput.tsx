"use client";

import { useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  length?: number;
}

export function OTPInput({
  value,
  onChange,
  error,
  disabled,
  length = 6,
}: OTPInputProps) {
  const digits = value.padEnd(length, "").split("").slice(0, length);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const focus = (index: number) => {
    refs.current[Math.max(0, Math.min(length - 1, index))]?.focus();
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, i) => (i === index ? char : d));
    onChange(next.join(""));
    if (char && index < length - 1) focus(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        const next = digits.map((d, i) => (i === index ? "" : d));
        onChange(next.join(""));
      } else if (index > 0) {
        const next = digits.map((d, i) => (i === index - 1 ? "" : d));
        onChange(next.join(""));
        focus(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focus(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focus(index + 1);
    } else if (e.key === "Delete") {
      e.preventDefault();
      const next = digits.map((d, i) => (i === index ? "" : d));
      onChange(next.join(""));
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const next = pasted.padEnd(length, "").split("").slice(0, length);
    onChange(next.join(""));
    focus(Math.min(pasted.length, length - 1));
  };

  return (
    <div
      className="flex gap-2 sm:gap-3 justify-center"
      role="group"
      aria-label="One-time password"
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { refs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border-2",
            "transition-all duration-150 outline-none",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "font-mono"
          )}
          style={{
            fontFamily: "var(--font-geist-mono)",
            color: "#0E1E1D",
            background: digit ? "#F4FAFA" : "#FFFFFF",
            borderColor: error
              ? "#DC2626"
              : digit
              ? "#3D827E"
              : "#C2E3E1",
            boxShadow: digit && !error
              ? "0 0 0 3px rgba(61,130,126,0.12)"
              : error
              ? "0 0 0 3px rgba(220,38,38,0.12)"
              : "none",
          }}
          onFocusCapture={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = "#3D827E";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(61,130,126,0.15)";
            }
          }}
          onBlurCapture={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = digit ? "#3D827E" : "#C2E3E1";
              e.currentTarget.style.boxShadow = digit ? "0 0 0 3px rgba(61,130,126,0.12)" : "none";
            }
          }}
        />
      ))}
    </div>
  );
}
