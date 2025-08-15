import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { BookmarkProvider } from "../contexts/BookmarkContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <AuthProvider>
          <BookmarkProvider>{children}</BookmarkProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.app",
};
