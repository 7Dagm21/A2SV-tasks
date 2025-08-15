"use client";

import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AuthModal } from "./AuthModal";

/**
 * AuthGate
 * Renders a full screen auth prompt (login/register) until user is authenticated.
 * Once authenticated, renders children.
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [showAuth, setShowAuth] = React.useState(true);
  const [mode, setMode] = React.useState<"login" | "register">("login");

  React.useEffect(() => {
    if (isAuthenticated) {
      setShowAuth(false);
    }
  }, [isAuthenticated]);

  if (isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-500">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl font-semibold mb-2">Welcome</h1>
        <p className="text-gray-600 mb-6 text-center max-w-sm">
          Please sign in or create an account to access the job portal and
          bookmark opportunities.
        </p>
        <div className="flex gap-3">
          <button
            data-testid="authgate-signin"
            onClick={() => {
              setMode("login");
              setShowAuth(true);
            }}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          >
            Sign In
          </button>
          <button
            data-testid="authgate-signup"
            onClick={() => {
              setMode("register");
              setShowAuth(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Sign Up
          </button>
        </div>
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          defaultMode={mode}
        />
      </div>
    );
  }

  return <>{children}</>;
}
