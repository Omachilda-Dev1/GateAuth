"use client";

import Link from "next/link";
import { LogIn, UserPlus, KeyRound, Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import { GateAuthLogo } from "@/components/auth/GateAuthLogo";

const flows = [
  {
    href: "/auth/login",
    icon: LogIn,
    title: "Sign In",
    description: "Email + password, social login, remember me",
    badge: "Start here",
  },
  {
    href: "/auth/signup",
    icon: UserPlus,
    title: "Create Account",
    description: "Registration with password strength meter",
    badge: null,
  },
  {
    href: "/auth/forgot-password",
    icon: KeyRound,
    title: "Forgot Password",
    description: "Email submission with 60s resend cooldown",
    badge: null,
  },
  {
    href: "/auth/verify-email",
    icon: Mail,
    title: "Verify Email",
    description: "6-digit OTP with auto-advance & paste support",
    badge: null,
  },
  {
    href: "/auth/reset-password?token=valid",
    icon: ShieldCheck,
    title: "Reset Password",
    description: "New password with strength meter & requirements",
    badge: null,
  },
  {
    href: "/auth/reset-password",
    icon: ShieldCheck,
    title: "Reset Password (Expired)",
    description: "Token-expired error state with recovery CTA",
    badge: "Error state",
  },
];

export default function AuthIndexPage() {
  return (
    <div
      className="min-h-dvh flex items-center justify-center p-4 sm:p-6"
      style={{ background: "#F4FAFA" }}
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GateAuthLogo iconSize={40} />
          </div>
          <p className="text-sm" style={{ color: "#4A6B69" }}>
            Every door, elegantly handled.
          </p>
          <div
            className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "#E9F5F4", color: "#2D605C" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D827E]" />
            UI Kit Demo — All flows interactive
          </div>
        </div>

        {/* Flow cards */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: "#FFFFFF", borderColor: "#E4ECEC", boxShadow: "0 1px 3px rgba(14,30,29,0.06), 0 8px 32px rgba(14,30,29,0.06)" }}
        >
          <div className="px-5 py-4 border-b" style={{ borderColor: "#E4ECEC" }}>
            <h2 className="text-sm font-semibold" style={{ color: "#0E1E1D" }}>
              Authentication Flows
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "#7A9E9C" }}>
              Click any flow to preview it
            </p>
          </div>

          <div className="divide-y" style={{ borderColor: "#E4ECEC" }}>
            {flows.map((flow) => {
              const Icon = flow.icon;
              return (
                <Link
                  key={flow.href}
                  href={flow.href}
                  className="flex items-center gap-4 px-5 py-4 transition-colors duration-150 group hover:bg-[#F4FAFA]"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-150"
                    style={{ background: "#E9F5F4" }}
                  >
                    <Icon size={17} style={{ color: "#3D827E" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: "#0E1E1D" }}>
                        {flow.title}
                      </span>
                      {flow.badge && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: flow.badge === "Error state" ? "#FEF2F2" : "#E9F5F4",
                            color: flow.badge === "Error state" ? "#B91C1C" : "#2D605C",
                          }}
                        >
                          {flow.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#7A9E9C" }}>
                      {flow.description}
                    </p>
                  </div>
                  <ArrowLeft
                    size={14}
                    className="shrink-0 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ color: "#3D827E" }}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: "#7A9E9C" }}>
          Built with Next.js · TypeScript · Tailwind CSS
        </p>
      </div>
    </div>
  );
}
