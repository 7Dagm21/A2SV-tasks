"use client";

import { useState } from "react"; // Local component state management
import { useSearchParams, useRouter } from "next/navigation"; // Client-side routing helpers
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ChevronRight } from "lucide-react";

/**
 * Verification Page
 * Combines the original human-verification layout & design with functional OTP verification flow.
 * - Preserves original heading, description, Begin button, and language selector styling.
 * - After clicking Begin, shows OTP inputs & Verify button (disabled until 4 digits entered).
 * - If an email query param exists (?email=foo@example.com), submits OTP to backend API.
 * - Otherwise simulates success.
 */
export default function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  // UI state
  const [selectedLanguage, setSelectedLanguage] = useState("english"); // Language selector value
  const [started, setStarted] = useState(false); // Has user clicked Begin?
  const [otp, setOtp] = useState(""); // Current OTP input value (4 digits expected)
  const [submitting, setSubmitting] = useState(false); // Network / verification in progress
  const [error, setError] = useState<string | null>(null); // Error message (network / validation)
  const [success, setSuccess] = useState(false); // Verification succeeded

  const handleBegin = () => {
    setStarted(true);
    setError(null);
  };

  // Executes verification logic (simulated when email param is absent)
  const handleVerify = async () => {
    if (otp.length !== 4) return;
    setSubmitting(true);
    setError(null);
    try {
      if (email) {
        const res = await fetch(
          "https://akil-backend.onrender.com/verify-email",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // Backend expects fields email & OTP (based on reference implementation)
            body: JSON.stringify({ email, OTP: otp }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || "Verification failed.");
        } else {
          setSuccess(true);
          // Redirect to sign-in after a short delay
          setTimeout(() => router.push("/sign-in"), 1200);
        }
      } else {
        // No email provided -> simulate success
        await new Promise((r) => setTimeout(r, 600)); // Simulate latency for UX realism
        setSuccess(true);
      }
    } catch (e: any) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Heading */}
        <h1
          data-testid="hv-heading"
          className="text-2xl font-normal text-orange-500 leading-tight"
        >
          {"Let's confirm you are"}
          <br />
          {"human"}
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed max-w-xs mx-auto">
          Complete the security check before continuing. This step verifies that
          you are not a bot, which helps to protect your account and prevent
          spam.
        </p>

        {/* Begin or OTP Stage */}
        {!started && (
          <Button
            data-testid="hv-begin"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded font-medium"
            size="default"
            onClick={handleBegin}
          >
            Begin
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}

        {started && (
          <div className="space-y-6" data-testid="hv-otp-stage">
            <div>
              <p className="text-sm text-gray-600">
                Enter the 4-digit code sent{" "}
                {email ? `to ${email}` : "to your email"}.
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              {/* OTP Input group (4 slots) */}
              <InputOTP value={otp} onChange={setOtp} maxLength={4}>
                <InputOTPGroup className="gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <InputOTPSlot
                      /*
                       * Add pointer-events-auto to override any parent style that may disable interaction
                       * so Cypress (and users) can click/type reliably in headless mode.
                       */
                      key={i}
                      index={i}
                      data-testid={`hv-otp-${i}`}
                      className="border-orange-500 text-lg w-12 h-12 pointer-events-auto"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <div className="text-xs text-gray-500">
                You can request to{" "}
                <span className="text-orange-600 font-medium">Resend code</span>{" "}
                in 0:30
              </div>
              {error && (
                <div data-testid="hv-error" className="text-sm text-red-600">
                  {error}
                </div>
              )}
              {success && (
                <div
                  data-testid="hv-success"
                  className="text-sm text-green-600"
                >
                  Verification successful! Redirecting...
                </div>
              )}
              {/* Primary action: disabled until 4 chars entered, or while submitting, or after success */}
              <Button
                data-testid="hv-verify"
                onClick={handleVerify}
                disabled={otp.length !== 4 || submitting || success}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300"
              >
                {submitting ? "Verifying..." : success ? "Verified" : "Verify"}
              </Button>
            </div>
          </div>
        )}

        {/* Language selector */}
        <div className="pt-8">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-32 mx-auto border-gray-300 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Español</SelectItem>
              <SelectItem value="french">Français</SelectItem>
              <SelectItem value="german">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
