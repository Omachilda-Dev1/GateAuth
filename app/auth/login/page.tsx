"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail } from "lucide-react";
import { toast } from "sonner";

import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { LoadingButton } from "@/components/auth/LoadingButton";
import { SocialButton } from "@/components/auth/SocialButton";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { FormError } from "@/components/auth/FormError";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setFormError(null);
    await new Promise((r) => setTimeout(r, 1500));
    if (data.email !== "demo@gateauth.com") {
      setFormError(
        "The email or password you entered is incorrect. Please try again."
      );
      setLoading(false);
      return;
    }
    toast.success("Welcome back!", { description: "You've been signed in successfully." });
    setLoading(false);
  };

  return (
    <AuthCard>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0E1E1D" }}>
          Sign in to your account
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "#4A6B69" }}>
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold underline-offset-2 hover:underline transition-colors"
            style={{ color: "#3D827E" }}
          >
            Create one free
          </Link>
        </p>
      </div>

      {/* Error banner */}
      {formError && <FormError message={formError} className="mb-5" />}

      {/* Social */}
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <SocialButton provider="google" />
        <SocialButton provider="github" />
      </div>

      <AuthDivider />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

        <div className="space-y-1">
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            autoComplete="current-password"
            {...register("password")}
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("rememberMe")}
              />
              <div className="w-4 h-4 rounded border-2 border-[#C2E3E1] peer-checked:bg-[#3D827E] peer-checked:border-[#3D827E] transition-all duration-150 flex items-center justify-center">
                <svg className="hidden peer-checked:block w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <span className="text-sm" style={{ color: "#4A6B69" }}>Remember me</span>
          </label>

          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium transition-colors hover:underline underline-offset-2"
            style={{ color: "#3D827E" }}
          >
            Forgot password?
          </Link>
        </div>

        <LoadingButton type="submit" loading={loading} className="mt-2">
          {loading ? "Signing in…" : "Sign in"}
        </LoadingButton>
      </form>

      {/* Security note */}
      <p className="mt-5 flex items-center justify-center gap-1.5 text-xs" style={{ color: "#7A9E9C" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M6 1L1.5 3v3c0 2.485 1.95 4.8 4.5 5.5C8.55 10.8 10.5 8.485 10.5 6V3L6 1z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        </svg>
        Protected by 256-bit TLS encryption
      </p>
    </AuthCard>
  );
}
