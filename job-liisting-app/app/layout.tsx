import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Find your next opportunity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-white min-h-screen">{children}</body>
    </html>
  );
}
