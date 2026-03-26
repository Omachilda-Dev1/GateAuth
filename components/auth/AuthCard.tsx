import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border p-6 sm:p-8",
        className
      )}
      style={{
        background: "#FFFFFF",
        borderColor: "#E4ECEC",
        boxShadow: "0 1px 3px rgba(14,30,29,0.06), 0 8px 32px rgba(14,30,29,0.06)",
      }}
    >
      {children}
    </div>
  );
}
