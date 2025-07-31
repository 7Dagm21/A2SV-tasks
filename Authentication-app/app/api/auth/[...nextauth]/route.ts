import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

// NextAuth configuration options
export const authOptions: NextAuthOptions = {
  // Define authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Custom authorize function for credentials login
      async authorize(credentials) {
        try {
          // Validate required fields
          if (!credentials?.email || !credentials?.password) {
            console.log("❌ Missing credentials");
            return null;
          }

          console.log("🔐 Attempting login with:", credentials.email);

          // Make request to your backend API
          const response = await fetch(
            "https://akil-backend.onrender.com/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          // Log response details
          console.log("📡 API Response status:", response.status);

          if (!response.ok) {
            console.error("❌ Login API failed:", response.statusText);

            try {
              const errorData = await response.json();
              console.error("🪵 Error details:", errorData);
            } catch (parseError) {
              console.error("⚠️ Couldn't parse error JSON:", parseError);
            }

            return null;
          }

          // Check for JSON content-type
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            console.error("⚠️ Expected JSON, got:", contentType);
            return null;
          }

          // Parse and validate response data
          const data = await response.json();
          console.log("✅ API login response:", data);

          // Primary successful login structure
          if (data.success && data.data) {
            return {
              id: data.data.id || credentials.email,
              email: credentials.email,
              name: data.data.name || credentials.email,
              accessToken: data.data.accessToken,
            };
          }

          // Alternate structure fallback
          if (data.user || data.token) {
            return {
              id: data.user?.id || credentials.email,
              email: credentials.email,
              name: data.user?.name || credentials.email,
              accessToken: data.token || data.accessToken,
            };
          }

          console.log("❌ Unexpected response structure");
          return null;
        } catch (error) {
          console.error("💥 Error in authorize:", error);
          return null;
        }
      },
    }),
  ],

  // Custom JWT and session callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // Custom pages
  pages: {
    signIn: "/login", // redirect here for login
    error: "/login", // also handle errors here
  },

  // Use JWT for session strategy
  session: {
    strategy: "jwt",
  },

  // Secret key for encryption (should be stored securely in .env)
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",

  // Enable debug mode during development
  debug: process.env.NODE_ENV === "development",
};

// Export handlers for GET and POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
