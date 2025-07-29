"use client";

import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch by ensuring page only renders client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (mounted && status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router, mounted]);

  // Sign-out and redirect to home
  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    router.push("/");
  };

  // Prevent SSR loading glitches
  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redundant fallback (rare case)
  if (!session) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-white text-2xl">✓</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Successfully Logged In!</h1>

        <p className="text-gray-600 text-lg">
          Welcome, {session.user?.name || session.user?.email}
        </p>

        <Button
          onClick={handleSignOut}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
