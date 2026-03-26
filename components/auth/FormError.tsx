import { cn } from "@/lib/utils";

interface FormErrorProps {
  message: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn("flex items-start gap-3 p-3.5 rounded-xl border", className)}
      style={{
        background: "#FEF2F2",
        borderColor: "#FECACA",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7.5" stroke="#DC2626" />
        <path d="M8 4.5v4M8 10.5v1" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="text-sm font-medium leading-snug" style={{ color: "#B91C1C" }}>
        {message}
      </p>
    </div>
  );
}
