/**
 * Authentication Types
 * Defines interfaces for user authentication and authorization
 */

export interface User {
  id: string
  name: string
  email: string
  role: string
  profileComplete: boolean
  profilePicture?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: "user" // Must be "user" as specified in requirements
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    accessToken: string
    refreshToken: string
  }
}

export interface AuthError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}
