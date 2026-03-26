"use client";

import { usePasswordStrength } from "@/lib/hooks/usePasswordStrength";

interface PasswordStrengthMeterProps {
  password: string;
}

const BAR_COLORS = ["", "#DC2626", "#D97706", "#3D827E", "#16A34A"];
const LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const LABEL_COLORS = ["", "#DC2626", "#D97706", "#2D605C", "#15803D"];

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { level } = usePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-1.5" aria-live="polite" aria-label={`Password strength: ${LABELS[level]}`}>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className="h-1 flex-1 rounded-full transition-all duration-300 ease-out"
            style={{
              background: bar <= level ? BAR_COLORS[level] : "#C2E3E1",
            }}
          />
        ))}
      </div>
      {level > 0 && (
        <p className="text-xs font-medium" style={{ color: LABEL_COLORS[level] }}>
          {LABELS[level]} password
          {level === 1 && " — add uppercase, numbers & symbols"}
          {level === 2 && " — add numbers & symbols to strengthen"}
          {level === 3 && " — add symbols for maximum strength"}
        </p>
      )}
    </div>
  );
}
