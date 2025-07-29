"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // 📦 Load email from localStorage or redirect to signup if missing
  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/signup");
    }

    // ⏱ Countdown timer for resend button
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // 🔢 Handle input value and auto-focus next field
  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (error) setError("");
  };

  // ⬅️ Handle backspace to move to previous field
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // 🚀 Submit verification
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (!/^\d{4}$/.test(otpString)) {
      setError("Verification code must be exactly 4 digits");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            OTP: otpString,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("verificationEmail");
        alert("Email verified successfully!");
        router.push("/login");
      } else {
        setError(data.message || "Verification failed");
        setOtp(["", "", "", ""]);
      }
    } catch (error) {
      setError("Network error. Please try again.");
      setOtp(["", "", "", ""]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔁 Handle resend code logic and reset timer
  const handleResendCode = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(30);
    setError("");

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      alert("Verification code resent successfully!");
    } catch (error) {
      setError("Failed to resend code. Please try again.");
      setCanResend(true);
      clearInterval(timer);
      setResendTimer(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Verify Email
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed px-8">
            We've sent a verification code to the email address you provided. To
            complete the verification process, please enter the code here.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-16 h-16 text-center text-xl font-semibold bg-white border-2 rounded-lg focus:ring-0 ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-indigo-200 focus:border-indigo-500"
                }`}
              />
            ))}
          </div>

          <div className="text-center text-sm text-gray-500">
            You can request to{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!canResend}
              className={`font-medium ${
                canResend
                  ? "text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend code
            </button>
            {!canResend && (
              <span className="text-gray-500">
                {" "}
                in 0:{resendTimer.toString().padStart(2, "0")}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-indigo-400 hover:bg-indigo-500 text-white font-medium rounded-full disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
