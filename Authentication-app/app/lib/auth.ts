import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

// Define our own config type to avoid import issues
interface AuthConfig {
  providers: any[];
  callbacks?: {
    jwt?: (params: { token: any; user?: any }) => Promise<any>;
    session?: (params: { session: any; token: any }) => Promise<any>;
  };
  pages?: {
    signIn?: string;
    error?: string;
  };
  session?: {
    strategy: "jwt" | "database";
  };
  secret?: string;
  debug?: boolean;
}

export const config: AuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          console.log("Attempting login with:", credentials.email);

          const response = await fetch(
            "https://akil-backend.onrender.com/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email as string,
                password: credentials.password as string,
              }),
            }
          );

          console.log("API Response status:", response.status);

          if (!response.ok) {
            console.error(
              "API returned error:",
              response.status,
              response.statusText
            );
            return null;
          }

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            console.error("API did not return JSON, got:", contentType);
            const text = await response.text();
            console.error("Response body:", text.substring(0, 200));
            return null;
          }

          const data = await response.json();
          console.log("Login API response:", data);

          if (data.success && data.data) {
            return {
              id: data.data.id || (credentials.email as string),
              email: credentials.email as string,
              name: data.data.name || (credentials.email as string),
              accessToken: data.data.accessToken,
            };
          }

          console.log("Login failed - invalid response structure");
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "fallback-secret-for-development",
  debug: true,
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
