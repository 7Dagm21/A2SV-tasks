"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  console.log("Navbar user:", user, "isAuthenticated:", isAuthenticated);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-orange-500">
          JobPortal
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/"
                ? "text-orange-500"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className={`text-sm font-medium ${
              pathname === "/jobs"
                ? "text-orange-500"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            Jobs
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm font-medium ${
              pathname.includes("/dashboard")
                ? "text-orange-500"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            Dashboard
          </Link>
          {!isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              className="ml-4 bg-transparent"
              asChild
            >
              <Link href="/login">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
          ) : (
            <div className="relative ml-4">
              <button
                className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-gray-100 border border-gray-200"
                onClick={() => setProfileOpen((v) => !v)}
                aria-label="Open profile menu"
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {user?.name || user?.email || "Profile"}
                </span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user?.email}
                  </div>
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 space-y-2">
            <Link
              href="/"
              className={`block py-2 text-sm font-medium ${
                pathname === "/" ? "text-orange-500" : "text-gray-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className={`block py-2 text-sm font-medium ${
                pathname === "/jobs" ? "text-orange-500" : "text-gray-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/dashboard"
              className={`block py-2 text-sm font-medium ${
                pathname.includes("/dashboard")
                  ? "text-orange-500"
                  : "text-gray-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            {!isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full bg-transparent"
                asChild
              >
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            ) : (
              <div className="mt-2">
                <button
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border border-gray-200 rounded"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </button>
                <div className="px-4 py-2 text-xs text-gray-500 border-t mt-2">
                  {user?.email}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
