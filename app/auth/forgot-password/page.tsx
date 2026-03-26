"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { LoadingButton } from "@/components/auth/LoadingButton";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [resending, setResending] = useState(false);
  const { seconds, isRunning, start } = useCountdown(60);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSentEmail(data.email);
    setSubmitted(true);
    start();
    setLoading(false);
  };

  const handleResend = async () => {
    if (isRunning) return;
    setResending(true);
    await new Promise((r) => setTimeout(r, 800));
    start();
    setResending(false);
  };

  if (submitted) {
    return (
      <AuthCard>
        <div className="text-center space-y-5">
          {/* Icon */}
          <div
            className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center animate-scale-in"
            style={{ background: "#E9F5F4" }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M4 8h24v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" stroke="#3D827E" strokeWidth="1.8" fill="none"/>
              <path d="M4 8l12 10L28 8" stroke="#3D827E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0E1E1D" }}>
              Check your inbox
            </h1>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#4A6B69" }}>
              We sent a password reset link to
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: "#1C3D3B" }}>
              {sentEmail}
            </p>
          </div>

          {/* Info box */}
          <div
            className="rounded-xl p-4 text-left space-y-2"
            style={{ background: "#F4FAFA", border: "1px solid #C2E3E1" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#4BA19C" }}>
              What to do next
            </p>
            {[
              "Open the email from GateAuth",
              "Click the reset link (valid for 15 minutes)",
              "Choose a new secure password",
            ].map((step, i) => (
              <div key={step} className="flex items-start gap-2.5">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ background: "#3D827E", color: "white" }}
                >
                  {i + 1}
                </span>
                <p className="text-sm" style={{ color: "#2D605C" }}>{step}</p>
              </div>
            ))}
          </div>

          {/* Resend */}
          <p className="text-sm" style={{ color: "#4A6B69" }}>
            Didn&apos;t receive it?{" "}
            {isRunning ? (
              <span style={{ color: "#7A9E9C" }}>Resend in {seconds}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-semibold hover:underline underline-offset-2 transition-colors disabled:opacity-50"
                style={{ color: "#3D827E" }}
              >
                {resending ? "Sending…" : "Resend email"}
              </button>
            )}
          </p>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline underline-offset-2"
            style={{ color: "#3D827E" }}
          >
            <ArrowLeft size={14} />
            Back to sign in
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="mb-7">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-5 transition-colors hover:underline underline-offset-2"
          style={{ color: "#4BA19C" }}
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>

        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0E1E1D" }}>
          Reset your password
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#4A6B69" }}>
          Enter your email address and we&apos;ll send you a secure link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <AuthInput
          label="Email address"
          type="email"
          placeholder="you@company.com"
          icon={<Mail size={15} />}
          error={errors.email?.message}
          autoComplete="email"
          autoFocus
          {...register("email")}
        />

        <LoadingButton type="submit" loading={loading}>
          {loading ? "Sending reset link…" : "Send reset link"}
        </LoadingButton>
      </form>

      <p className="mt-5 text-xs text-center" style={{ color: "#7A9E9C" }}>
        Reset links expire after 15 minutes for security.
      </p>
    </AuthCard>
  );
}
