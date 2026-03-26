"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { verifyOTPSchema, type VerifyOTPFormData } from "@/lib/validations/auth";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { AuthCard } from "@/components/auth/AuthCard";
import { OTPInput } from "@/components/auth/OTPInput";
import { LoadingButton } from "@/components/auth/LoadingButton";
import { FormError } from "@/components/auth/FormError";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const { seconds, isRunning, start } = useCountdown(60);

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOTPFormData>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: { otp: "" },
  });

  const otp = watch("otp");

  const onSubmit = async (data: VerifyOTPFormData) => {
    setLoading(true);
    setFormError(null);
    await new Promise((r) => setTimeout(r, 1500));
    if (data.otp !== "123456") {
      setFormError("That code is incorrect or has expired. Please try again or request a new one.");
      setLoading(false);
      return;
    }
    setVerified(true);
    setLoading(false);
  };

  const handleResend = async () => {
    if (isRunning) return;
    setResending(true);
    await new Promise((r) => setTimeout(r, 800));
    start();
    setValue("otp", "");
    setFormError(null);
    setResending(false);
  };

  if (verified) {
    return (
      <AuthCard>
        <div className="flex flex-col items-center text-center gap-5 py-6">
          {/* Animated checkmark */}
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
              Email verified!
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#4A6B69" }}>
              Your account is now active. You can sign in to get started.
            </p>
          </div>

          <a
            href="/auth/login"
            className="inline-flex items-center justify-center h-11 px-8 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#3D827E" }}
          >
            Continue to sign in
          </a>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="text-center mb-7">
        <div
          className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "#E9F5F4" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M3.5 7h21v14a1.75 1.75 0 0 1-1.75 1.75H5.25A1.75 1.75 0 0 1 3.5 21V7z" stroke="#3D827E" strokeWidth="1.6" fill="none"/>
            <path d="M3.5 7l10.5 8.75L24.5 7" stroke="#3D827E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0E1E1D" }}>
          Verify your email
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "#4A6B69" }}>
          We sent a 6-digit code to your email address. Enter it below to verify your account.
        </p>
      </div>

      {formError && <FormError message={formError} className="mb-5" />}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="space-y-2">
          <OTPInput
            value={otp}
            onChange={(val) => {
              setValue("otp", val, { shouldValidate: true });
              if (formError) setFormError(null);
            }}
            error={!!errors.otp || !!formError}
            disabled={loading}
          />
          {errors.otp && !formError && (
            <p role="alert" className="text-xs font-medium text-center" style={{ color: "#DC2626" }}>
              {errors.otp.message}
            </p>
          )}
        </div>

        <LoadingButton type="submit" loading={loading} disabled={otp.length < 6}>
          {loading ? "Verifying…" : "Verify email"}
        </LoadingButton>
      </form>

      {/* Resend */}
      <div className="mt-6 text-center space-y-1">
        <p className="text-sm" style={{ color: "#4A6B69" }}>
          Didn&apos;t receive the code?
        </p>
        {isRunning ? (
          <p className="text-sm" style={{ color: "#7A9E9C" }}>
            Resend available in{" "}
            <span className="font-semibold tabular-nums" style={{ color: "#3D827E" }}>
              {seconds}s
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-sm font-semibold hover:underline underline-offset-2 transition-colors disabled:opacity-50"
            style={{ color: "#3D827E" }}
          >
            {resending ? "Sending…" : "Resend code"}
          </button>
        )}
      </div>

      {/* Demo hint */}
      <div
        className="mt-5 rounded-lg p-3 text-center"
        style={{ background: "#F4FAFA", border: "1px solid #C2E3E1" }}
      >
        <p className="text-xs" style={{ color: "#4BA19C" }}>
          Demo: enter <span className="font-mono font-bold">123456</span> to verify
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/auth/signup"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline underline-offset-2"
          style={{ color: "#4BA19C" }}
        >
          <ArrowLeft size={14} />
          Back to sign up
        </Link>
      </div>
    </AuthCard>
  );
}
