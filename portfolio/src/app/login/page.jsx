"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function scorePassword(password) {
  let score = 0;
  if (!password) return 0;
  const lengthBonus = Math.min(2, Math.floor(password.length / 4));
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const varietyBonus = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length - 1; // 0-3
  score = lengthBonus + Math.max(0, varietyBonus);
  return Math.max(0, Math.min(4, score));
}

function getScoreLabel(score) {
  switch (score) {
    case 0:
      return "Very weak";
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
      return "Strong";
    default:
      return "";
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const passwordScore = useMemo(() => scorePassword(password), [password]);

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
  }, [email]);

  const isPasswordValid = password.length >= 8;

  const isFormValid = isEmailValid && isPasswordValid;

  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [email, password]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    if (!isFormValid) return;
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 900));
      setSuccess("Logged in successfully.");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-black/30 shadow-sm border border-black/10 dark:border-white/10 rounded-xl backdrop-blur p-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-black/60 dark:text-white/60 mt-1">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
              />
              {!isEmailValid && email.length > 0 && (
                <p className="text-xs text-red-600">Enter a valid email address.</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-xs text-black/70 dark:text-white/70 hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/30 px-3 py-2 pr-24 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-black/60 dark:text-white/60 select-none">
                  {getScoreLabel(passwordScore)}
                </span>
              </div>
              <div className="h-1.5 w-full rounded bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${(passwordScore / 4) * 100}%`,
                    background:
                      passwordScore < 2
                        ? "#ef4444"
                        : passwordScore === 2
                        ? "#f59e0b"
                        : passwordScore === 3
                        ? "#10b981"
                        : "#22c55e",
                  }}
                />
              </div>
              {!isPasswordValid && password.length > 0 && (
                <p className="text-xs text-red-600">Password must be at least 8 characters.</p>
              )}
              <div className="flex justify-end">
                <Link href="#" className="text-xs text-black/70 dark:text-white/70 hover:underline">Forgot password?</Link>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50/60 dark:bg-red-950/40 border border-red-200/60 dark:border-red-900/50 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm text-green-700 bg-green-50/60 dark:bg-green-950/40 border border-green-200/60 dark:border-green-900/50 rounded-md px-3 py-2">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full rounded-lg bg-black text-white dark:bg-white dark:text-black py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative text-center">
              <span className="px-2 text-xs text-black/60 dark:text-white/60 bg-white/70 dark:bg-black/30 relative z-10">Or continue with</span>
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-black/10 dark:bg-white/10" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button type="button" className="border border-black/10 dark:border-white/10 rounded-lg py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">Google</button>
              <button type="button" className="border border-black/10 dark:border-white/10 rounded-lg py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">GitHub</button>
              <button type="button" className="border border-black/10 dark:border-white/10 rounded-lg py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">Twitter</button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-black/70 dark:text-white/70">
            Don&apos;t have an account? <Link href="#" className="hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

