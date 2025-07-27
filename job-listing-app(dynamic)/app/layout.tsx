/**
 * Root Layout Component
 *
 * This is the root layout component for the Next.js application using the app router.
 * It defines the basic HTML structure and provides global providers that need to be
 * available throughout the entire application.
 *
 * Features:
 * - Sets up the basic HTML document structure
 * - Provides Redux store to all child components
 * - Includes global CSS and Tailwind CSS
 * - Configures metadata for SEO and browser display
 * - Ensures consistent layout across all pages
 *
 * This component wraps all pages and is the highest level component in the
 * application hierarchy. Any providers or global setup should be done here.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

import type React from "react";
import type { Metadata } from "next";
import { Providers } from "./StoreProvider";
import "./styles/globals.css";

/**
 * Metadata Configuration
 *
 * Defines the default metadata for the application that will be used
 * across all pages unless overridden by specific page metadata.
 * This affects SEO, social media sharing, and browser display.
 */
export const metadata: Metadata = {
  title: "Job Portal", // Default page title shown in browser tab
  description: "Find your next opportunity", // Meta description for search engines

  // Additional metadata can be added here:
  // keywords: ["jobs", "careers", "opportunities", "employment"],
  // authors: [{ name: "Job Portal Team" }],
  // viewport: "width=device-width, initial-scale=1",
  // robots: "index, follow",
};

/**
 * TypeScript interface for layout props
 *
 * Defines the props that the root layout component receives.
 * In Next.js app router, layouts receive children as their main prop.
 */
interface RootLayoutProps {
  children: React.ReactNode; // All page content that will be rendered inside this layout
}

/**
 * Root Layout Component
 *
 * This component defines the basic HTML structure for the entire application.
 * It includes the HTML document structure, global providers, and styling setup.
 *
 * Key responsibilities:
 * - Provide HTML document structure (html, head, body)
 * - Include global CSS and external stylesheets
 * - Wrap children with necessary providers (Redux, theme, etc.)
 * - Set up global configurations and metadata
 *
 * @param children - The page content to be rendered inside the layout
 * @returns Complete HTML document structure with providers
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      {/* HTML Head Section */}
      <head>
        {/* 
          Tailwind CSS CDN for styling
          Note: In production, it's recommended to install Tailwind locally
          for better performance and customization options
        */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* Additional head elements can be added here:
          - Custom fonts (Google Fonts, etc.)
          - Analytics scripts
          - Favicon links
          - Meta tags for social media
        */}
      </head>

      {/* HTML Body Section */}
      <body className="bg-white min-h-screen">
        {/* 
          Providers Component
          Wraps the entire application with necessary providers:
          - Redux Provider for state management
          - Future providers (theme, auth, etc.) can be added here
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

/**
 * Layout Hierarchy Notes:
 *
 * 1. **Next.js App Router Structure**:
 *    ```
 *    app/
 *    ├── layout.tsx (this file - root layout)
 *    ├── page.tsx (home page)
 *    ├── jobs/
 *    │   ├── layout.tsx (optional nested layout)
 *    │   └── [id]/
 *    │       └── page.tsx (job detail page)
 *    └── globals.css
 *    ```
 *
 * 2. **Provider Order**:
 *    - Providers are applied from outermost to innermost
 *    - Redux Provider should be near the root for global state access
 *    - Theme providers typically wrap Redux providers
 *    - Error boundaries should wrap everything
 *
 * 3. **Global Styles**:
 *    - globals.css is imported here to apply to all pages
 *    - Tailwind CSS is loaded via CDN for simplicity
 *    - Component-specific styles are handled by Tailwind classes
 *
 * 4. **Metadata Inheritance**:
 *    - This metadata serves as the default for all pages
 *    - Individual pages can override with their own metadata
 *    - Dynamic metadata can be generated in page components
 */

/**
 * Performance Considerations:
 *
 * 1. **CSS Loading**:
 *    - Tailwind CDN is used for development simplicity
 *    - For production, consider installing Tailwind locally
 *    - This reduces bundle size and improves performance
 *
 * 2. **Provider Optimization**:
 *    - Providers should be stable (don't recreate on renders)
 *    - Heavy providers should be lazy-loaded when possible
 *    - Consider code-splitting for large provider dependencies
 *
 * 3. **Script Loading**:
 *    - External scripts should be loaded asynchronously when possible
 *    - Consider using Next.js Script component for better optimization
 *    - Analytics and tracking scripts can be deferred
 */

/**
 * Accessibility Considerations:
 *
 * 1. **Language Declaration**:
 *    - lang="en" attribute helps screen readers
 *    - Should be updated for internationalized applications
 *
 * 2. **Semantic Structure**:
 *    - Proper HTML5 semantic elements should be used in pages
 *    - Skip links can be added for keyboard navigation
 *    - Focus management should be handled in page transitions
 *
 * 3. **Color and Contrast**:
 *    - Background color ensures proper contrast
 *    - Theme providers can handle dark/light mode switching
 *    - Color-only information should have alternative indicators
 */
