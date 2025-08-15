import type { VerificationData } from "../types/verification"

// Dummy verification data generator
export function generateVerificationData(): VerificationData {
  return {
    sessionId: `sess_${Math.random().toString(36).substring(2, 15)}`,
    timestamp: Date.now(),
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "Server-side",
    ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  }
}

// Simulate verification process
export async function simulateVerification(data: VerificationData): Promise<{ success: boolean; message: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate random success/failure for demo
  const success = Math.random() > 0.1 // 90% success rate

  return {
    success,
    message: success ? "Verification completed successfully!" : "Verification failed. Please try again.",
  }
}
