// Import base session type from next-auth
import type { DefaultSession } from "next-auth";

// ======================
// Module Augmentation for "next-auth"
// ======================
declare module "next-auth" {
  // Extend the Session object
  interface Session {
    // Custom access token attached to session
    accessToken?: string;

    // Extend the default user object
    user: {
      id: string; // required user ID
      email: string; // required user email
      name?: string; // optional name
    } & DefaultSession["user"]; // merge with default user props (e.g., image)
  }

  // Optional: Extend the User type returned from your database (or backend)
  interface User {
    id: string;
    email: string;
    name?: string;
    accessToken?: string; // token can be passed from your login response
  }
}

// ======================
// Module Augmentation for JWT (token lifecycle)
// ======================
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string; // makes the token available during callbacks/session
  }
}
