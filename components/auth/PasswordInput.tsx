"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { AuthInput } from "./AuthInput";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  hint?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = "Password", error, hint, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <AuthInput
        ref={ref}
        label={label}
        error={error}
        hint={hint}
        type={show ? "text" : "password"}
        icon={<Lock size={15} />}
        rightElement={
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#3D827E]"
            style={{ color: "#4BA19C" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2D605C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4BA19C")}
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
