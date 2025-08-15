import "./globals.css";
import type { ReactNode } from "react";
import Providers from "./providers";

export const metadata = {
  title: "Job Listing App",
  description: "Job listings with auth, bookmarks & human verification",
};

// Server layout: keeps global HTML shell lean; client state lives in Providers.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
