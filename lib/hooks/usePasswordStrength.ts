"use client";

import { useMemo } from "react";

export type StrengthLevel = 0 | 1 | 2 | 3 | 4;

export interface PasswordStrength {
  level: StrengthLevel;
  label: string;
  color: string;
}

export function usePasswordStrength(password: string): PasswordStrength {
  return useMemo(() => {
    if (!password) return { level: 0, label: "", color: "" };

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const level = Math.min(4, score) as StrengthLevel;

    const map: Record<StrengthLevel, { label: string; color: string }> = {
      0: { label: "", color: "" },
      1: { label: "Weak", color: "bg-red-500" },
      2: { label: "Fair", color: "bg-orange-400" },
      3: { label: "Good", color: "bg-yellow-400" },
      4: { label: "Strong", color: "bg-green-500" },
    };

    return { level, ...map[level] };
  }, [password]);
}
