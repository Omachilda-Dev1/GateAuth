"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, User, ArrowLeft } from "lucide-react";

import { signupSchema, type SignupFormData } from "@/lib/validations/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { LoadingButton } from "@/components/auth/LoadingButton";
import { SocialButton } from "@/components/auth/SocialButton";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { FormError } from "@/components/auth/FormError";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (_data: SignupFormData) => {
    setLoading(true);
    setFormError(null);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push("/auth/verify-email");
  };

  return (
    <AuthCard>
      {/* Header */}
      <div className="mb-7">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-4 transition-colors hover:underline underline-offset-2"
          style={{ color: "#4BA19C" }}
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0E1E1D" }}>
          Create your account
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "#4A6B69" }}>
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold hover:underline underline-offset-2 transition-colors"
            style={{ color: "#3D827E" }}
          >
            Sign in
          </Link>
        </p>
      </div>

      {formError && <FormError message={formError} className="mb-5" />}

      {/* Social */}
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <SocialButton provider="google" />
        <SocialButton provider="github" />
      </div>

      <AuthDivider />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <AuthInput
          label="Full name"
          type="text"
          placeholder="Jane Smith"
          icon={<User size={15} />}
          error={errors.fullName?.message}
          autoComplete="name"
          autoFocus
          {...register("fullName")}
        />

        <AuthInput
          label="Work email"
          type="email"
          placeholder="you@company.com"
          icon={<Mail size={15} />}
          error={errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />

        <div className="space-y-2">
          <PasswordInput
            label="Password"
            placeholder="Min. 8 characters"
            error={errors.password?.message}
            hint="Use 8+ characters with uppercase, numbers & symbols"
            autoComplete="new-password"
            {...register("password", {
              onChange: (e) => setPassword(e.target.value),
            })}
          />
          <PasswordStrengthMeter password={password} />
        </div>

        <PasswordInput
          label="Confirm password"
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          {...register("confirmPassword")}
        />

        {/* Terms */}
        <div className="space-y-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <div className="relative mt-0.5 flex-shrink-0">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("acceptTerms")}
              />
              <div className="w-4 h-4 rounded border-2 border-[#C2E3E1] peer-checked:bg-[#3D827E] peer-checked:border-[#3D827E] transition-all duration-150 flex items-center justify-center">
                <svg className="hidden peer-checked:block w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <span className="text-sm leading-snug" style={{ color: "#4A6B69" }}>
              I agree to the{" "}
              <Link href="#" className="font-medium hover:underline underline-offset-2" style={{ color: "#3D827E" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-medium hover:underline underline-offset-2" style={{ color: "#3D827E" }}>
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <p role="alert" className="text-xs font-medium flex items-center gap-1.5 pl-6.5" style={{ color: "#DC2626" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
                <path d="M6 3.5v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        <LoadingButton type="submit" loading={loading} className="mt-1">
          {loading ? "Creating account…" : "Create account"}
        </LoadingButton>
      </form>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-xs" style={{ color: "#7A9E9C" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M6 1L1.5 3v3c0 2.485 1.95 4.8 4.5 5.5C8.55 10.8 10.5 8.485 10.5 6V3L6 1z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        </svg>
        Your data is encrypted and never shared
      </p>
    </AuthCard>
  );
}
