import type React from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Authentication Demo",
  description: "Complete authentication system with NextAuth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
