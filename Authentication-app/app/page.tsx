"use client";

import Link from "next/link";
import { Button } from "./components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  // Show loading state during SSR and initial hydration
  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Authentication Demo
          </h1>
          <p className="text-gray-600">
            Complete authentication system with NextAuth
          </p>
          <div className="flex justify-center space-x-4">
            <div className="animate-pulse">
              <div className="h-12 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-12 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Authentication Demo
        </h1>
        <p className="text-gray-600">
          Complete authentication system with NextAuth
        </p>

        {session ? (
          <div className="space-y-4">
            <p className="text-green-600">
              Welcome back, {session.user?.name || session.user?.email}!
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/dashboard">
                <Button className="px-6 py-3 text-base bg-blue-600 text-white hover:bg-blue-700">
                  Go to Dashboard
                </Button>
              </Link>
              <Button
                onClick={handleSignOut}
                disabled={isSigningOut}
                variant="outline"
                className="px-6 py-3 text-base border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-50"
              >
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center space-x-4">
            <Link href="/signup">
              <Button className="px-6 py-3 text-base bg-blue-600 text-white hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="px-6 py-3 text-base border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              >
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
