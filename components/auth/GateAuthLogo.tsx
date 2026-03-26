import { cn } from "@/lib/utils";

interface GateAuthLogoProps {
  className?: string;
  iconSize?: number;
  variant?: "default" | "light";
}

export function GateAuthLogo({
  className,
  iconSize = 32,
  variant = "default",
}: GateAuthLogoProps) {
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="10" fill={isLight ? "rgba(186,222,220,0.2)" : "#3D827E"} />
        {/* Arch / gate top */}
        <path
          d="M10 28 L10 18 Q10 10 20 10 Q30 10 30 18 L30 28"
          stroke={isLight ? "#BADEDC" : "white"}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left pillar */}
        <rect x="10" y="22" width="5" height="8" rx="1" fill={isLight ? "#81C4C0" : "white"} />
        {/* Right pillar */}
        <rect x="25" y="22" width="5" height="8" rx="1" fill={isLight ? "#81C4C0" : "white"} />
        {/* Keyhole */}
        <circle cx="20" cy="21" r="2.5" fill={isLight ? "#BADEDC" : "rgba(255,255,255,0.9)"} />
        <rect x="19" y="22" width="2" height="3.5" rx="1" fill={isLight ? "#BADEDC" : "rgba(255,255,255,0.9)"} />
      </svg>

      <span
        className={cn(
          "text-xl font-bold tracking-tight",
          isLight ? "text-white" : "text-[#0E1E1D]"
        )}
        style={{ fontFamily: "var(--font-geist-sans)", letterSpacing: "-0.02em" }}
      >
        GateAuth
      </span>
    </div>
  );
}
