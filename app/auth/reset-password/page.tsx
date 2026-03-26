"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { LoadingButton } from "@/components/auth/LoadingButton";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async (_data: ResetPasswordFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push("/auth/login"), 3000);
  };

  /* ── Token expired ── */
  if (!token || token === "expired") {
    return (
      <AuthCard>
        <div className="flex flex-col items-center text-center gap-5 py-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "#FFFBEB" }}
          >
            <AlertTriangle size={28} style={{ color: "#D97706" }} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0E1E1D" }}>
              Link expired
            </h1>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#4A6B69" }}>
              This password reset link has expired or is no longer valid. Reset links are only valid for 15 minutes.
            </p>
          </div>

          <div
            className="w-full rounded-xl p-4 text-left"
            style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}
          >
            <p className="text-sm font-medium" style={{ color: "#92400E" }}>
              For security, reset links expire quickly. Please request a new one.
            </p>
          </div>

          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center justify-center h-11 px-8 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#3D827E" }}
          >
            Request new link
          </Link>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline underline-offset-2"
            style={{ color: "#4BA19C" }}
          >
            <ArrowLeft size={14} />
            Back to sign in
          </Link>
        </div>
      </AuthCard>
    );
  }

  /* ── Success ── */
  if (success) {
    return (
      <AuthCard>
        <div className="flex flex-col items-center text-center gap-5 py-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center animate-scale-in"
            style={{ background: "#DCFCE7" }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="18" stroke="#16A34A" strokeWidth="2" fill="none" />
              <path
                className="check-draw"
                d="M12 20l6 6 10-12"
                stroke="#16A34A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0E1E1D" }}>
              Password updated!
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#4A6B69" }}>
              Your password has been changed successfully. Redirecting you to sign in…
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: "#7A9E9C" }}>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5"/>
              <path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Redirecting in a moment…
          </div>
        </div>
      </AuthCard>
    );
  }

  /* ── Form ── */
  return (
    <AuthCard>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0E1E1D" }}>
          Choose a new password
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "#4A6B69" }}>
          Make it strong — you won&apos;t need to change it again soon.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-2">
          <PasswordInput
            label="New password"
            placeholder="Min. 8 characters"
            error={errors.password?.message}
            autoComplete="new-password"
            autoFocus
            {...register("password", {
              onChange: (e) => setPassword(e.target.value),
            })}
          />
          <PasswordStrengthMeter password={password} />
        </div>

        <PasswordInput
          label="Confirm new password"
          placeholder="Repeat your new password"
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          {...register("confirmPassword")}
        />

        {/* Password requirements */}
        <div
          className="rounded-xl p-3.5 space-y-1.5"
          style={{ background: "#F4FAFA", border: "1px solid #C2E3E1" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#4BA19C" }}>
            Requirements
          </p>
          {[
            { label: "At least 8 characters", met: password.length >= 8 },
            { label: "One uppercase letter", met: /[A-Z]/.test(password) },
            { label: "One number", met: /[0-9]/.test(password) },
          ].map(({ label, met }) => (
            <div key={label} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                {met ? (
                  <>
                    <circle cx="7" cy="7" r="6.5" fill="#3D827E" />
                    <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </>
                ) : (
                  <circle cx="7" cy="7" r="6.5" stroke="#C2E3E1" fill="none" />
                )}
              </svg>
              <span className="text-xs" style={{ color: met ? "#2D605C" : "#7A9E9C" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <LoadingButton type="submit" loading={loading} className="mt-1">
          {loading ? "Updating password…" : "Update password"}
        </LoadingButton>
      </form>

      <Link
        href="/auth/login"
        className="mt-5 flex items-center justify-center gap-1.5 text-sm font-medium transition-colors hover:underline underline-offset-2"
        style={{ color: "#4BA19C" }}
      >
        <ArrowLeft size={14} />
        Back to sign in
      </Link>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthCard>
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Loading">
              <circle cx="12" cy="12" r="10" stroke="#C2E3E1" strokeWidth="2.5"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#3D827E" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        </AuthCard>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
