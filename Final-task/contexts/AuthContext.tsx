"use client";

/**
 * Authentication Context
 * Provides authentication state and methods throughout the application
 */

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react"; // Core React primitives for context + lifecycle
import {
  loginUser,
  registerUser,
  tokenStorage,
  getCurrentUser,
  refreshAccessToken,
} from "../services/auth";
import type {
  AuthContextType,
  User,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";

// Create the context with an explicit undefined default so we can throw if used outside provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Holds the authenticated user object (null when logged out)
  const [user, setUser] = useState<User | null>(null);
  // Tracks async auth operations (initial load, login, register, refresh)
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Initialize authentication state on app load
   */
  useEffect(() => {
    initializeAuth();
  }, []);

  /**
   * Initialize authentication from stored tokens
   */
  const initializeAuth = async () => {
    try {
      const storedUser = tokenStorage.getUser();
      const accessToken = tokenStorage.getAccessToken();

      if (storedUser && accessToken) {
        // Try to fetch current user to validate token
        try {
          const currentUser = await getCurrentUser(accessToken);
          setUser(currentUser);
          tokenStorage.setUser(currentUser);
        } catch (error) {
          // Token might be expired, try to refresh
          const refreshToken = tokenStorage.getRefreshToken();
          if (refreshToken) {
            try {
              const authResponse = await refreshAccessToken(refreshToken);
              setUser(authResponse.data.user);
              tokenStorage.setTokens(
                authResponse.data.accessToken,
                authResponse.data.refreshToken
              );
              tokenStorage.setUser(authResponse.data.user);
            } catch (refreshError) {
              // Refresh failed, clear tokens
              tokenStorage.clearTokens();
              setUser(null);
            }
          } else {
            // No refresh token, clear everything
            tokenStorage.clearTokens();
            setUser(null);
          }
        }
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      tokenStorage.clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login user with credentials
   */
  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const authResponse = await loginUser(credentials);
      console.log("Login response:", authResponse);

      // Store tokens and user data
      tokenStorage.setTokens(
        authResponse.data.accessToken,
        authResponse.data.refreshToken
      );
      tokenStorage.setUser(authResponse.data.user);
      setUser(authResponse.data.user);
      console.log("Set user after login:", authResponse.data.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user with role "user"
   */
  // Registers a new user (role is forced to "user") and sets auth state
  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      // Ensure role is "user" as specified in requirements
      const registrationData = { ...credentials, role: "user" as const };
      const authResponse = await registerUser(registrationData);

      // Store tokens and user data
      tokenStorage.setTokens(
        authResponse.data.accessToken,
        authResponse.data.refreshToken
      );
      tokenStorage.setUser(authResponse.data.user);
      setUser(authResponse.data.user);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user and clear all stored data
   */
  const logout = () => {
    tokenStorage.clearTokens();
    setUser(null);
  };

  /**
   * Refresh access token
   */
  // Attempts to exchange the stored refresh token for a fresh access token
  const refreshToken = async () => {
    try {
      const refreshTokenValue = tokenStorage.getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error("No refresh token available");
      }

      const authResponse = await refreshAccessToken(refreshTokenValue);
      tokenStorage.setTokens(
        authResponse.data.accessToken,
        authResponse.data.refreshToken
      );
      tokenStorage.setUser(authResponse.data.user);
      setUser(authResponse.data.user);
    } catch (error) {
      console.error("Token refresh error:", error);
      logout(); // Clear everything if refresh fails
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
