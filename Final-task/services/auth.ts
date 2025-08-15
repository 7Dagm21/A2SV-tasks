/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from "../types/auth";

const API_BASE_URL = "https://akil-backend.onrender.com";

/**
 * Registers a new user with role "user"
 * @param credentials - User registration data
 * @returns Promise<AuthResponse> - Authentication response with tokens
 */
// Helper to normalize varying backend auth response shapes
function normalizeAuthResponse(raw: any): AuthResponse {
  // Some backends may return tokens at root or under data
  const dataContainer = raw.data || raw;
  const user: User = dataContainer.user ||
    dataContainer.profile || {
      id: dataContainer.user_id || dataContainer.id || "",
      name: dataContainer.name || dataContainer.username || "User",
      email: dataContainer.email || "",
      role: dataContainer.role || "user",
      profileComplete: !!dataContainer.profileComplete,
      profilePicture: dataContainer.profilePicture,
    };
  const accessToken =
    dataContainer.accessToken ||
    dataContainer.access_token ||
    raw.accessToken ||
    raw.token;
  const refreshToken =
    dataContainer.refreshToken ||
    dataContainer.refresh_token ||
    raw.refreshToken ||
    raw.refresh_token ||
    "";
  return {
    success: raw.success !== undefined ? raw.success : true,
    message: raw.message || "Authenticated",
    data: { user, accessToken, refreshToken },
  };
}

export async function registerUser(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  try {
    console.log("🔄 Registering new user...");

    // Ensure role is "user" as required
    const registrationData = {
      ...credentials,
      role: "user" as const, // Force role to be "user"
    };

    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Registration failed: ${response.status}`
      );
    }

    const raw = await response.json();
    const normalized = normalizeAuthResponse(raw);
    if (!normalized.data.accessToken) {
      throw new Error("Missing access token in registration response");
    }
    console.log("✅ User registered successfully", normalized);
    return normalized;
  } catch (error) {
    console.error("❌ Registration error:", error);
    throw error;
  }
}

/**
 * Logs in an existing user
 * @param credentials - User login credentials
 * @returns Promise<AuthResponse> - Authentication response with tokens
 */
export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    console.log("🔄 Logging in user...");

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Login failed: ${response.status}`);
    }

    const raw = await response.json();
    const normalized = normalizeAuthResponse(raw);
    if (!normalized.data.accessToken) {
      throw new Error("Missing access token in login response");
    }
    console.log("✅ User logged in successfully", normalized);
    return normalized;
  } catch (error) {
    console.error("❌ Login error:", error);
    throw error;
  }
}

/**
 * Refreshes the access token using refresh token
 * @param refreshToken - The refresh token
 * @returns Promise<AuthResponse> - New authentication response
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<AuthResponse> {
  try {
    console.log("🔄 Refreshing access token...");

    const response = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`);
    }

    const raw = await response.json();
    const normalized = normalizeAuthResponse(raw);
    if (!normalized.data.accessToken) {
      throw new Error("Missing access token in refresh response");
    }
    console.log("✅ Access token refreshed successfully");
    return normalized;
  } catch (error) {
    console.error("❌ Token refresh error:", error);
    throw error;
  }
}

/**
 * Gets the current user profile
 * @param accessToken - The access token
 * @returns Promise<User> - User profile data
 */
export async function getCurrentUser(accessToken: string): Promise<User> {
  try {
    console.log("🔄 Fetching current user...");

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch user");
    }

    console.log("✅ Current user fetched successfully");
    return data.data;
  } catch (error) {
    console.error("❌ Fetch user error:", error);
    throw error;
  }
}

/**
 * Utility functions for token management
 */
export const tokenStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  clearTokens: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser: (user: User): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  },
};
