/**
 
 * This component is used in the root layout to ensure all pages
 * and components have access to the Redux store.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

"use client";

import type React from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

/**
 * TypeScript interface for component props
 *
 * Defines the expected props for the Providers component.
 * Currently only accepts children, but can be extended for
 * additional configuration options.
 */
interface ProvidersProps {
  children: React.ReactNode; // All child components that need provider access
}

/**
 * Providers Component
 *
 * Wraps the application with the Redux Provider to make the store
 * available to all child components. This enables components to:
 * - Access Redux state using useAppSelector
 * - Dispatch actions using useAppDispatch
 * - Subscribe to state changes for re-rendering
 *
 * The "use client" directive ensures this component runs on the client
 * side, which is required for Redux Provider functionality.
 *
 * @param children - Child components that need access to providers
 * @returns JSX element wrapping children with necessary providers
 */
export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}

/**
 * Provider Setup Notes:
 *
 * 1. **Redux Provider**:
 *    - Makes the Redux store available to all child components
 *    - Enables useSelector and useDispatch hooks throughout the app
 *    - Handles subscription management for component re-renders
 *
 * 2. **Client-Side Rendering**:
 *    - The "use client" directive is required for Redux Provider
 *    - This component runs in the browser, not during SSR
 *    - Ensures proper hydration of Redux state
 *
 * 3. **Future Providers**:
 *    Additional providers can be added here as the app grows:
 *    ```typescript
 *    export function Providers({ children }: ProvidersProps) {
 *      return (
 *        <Provider store={store}>
 *          <ThemeProvider>
 *            <AuthProvider>
 *              <ToastProvider>
 *                {children}
 *              </ToastProvider>
 *            </AuthProvider>
 *          </ThemeProvider>
 *        </Provider>
 *      )
 *    }
 *    ```
 *
 * 4. **Performance Considerations**:
 *    - Provider components should be stable (don't recreate on each render)
 *    - Store instance is created once and reused
 *    - Child components only re-render when their selected state changes
 */

/**
 * Usage in Layout:
 *
 * This component is used in app/layout.tsx to wrap the entire application:
 *
 * ```typescript
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <Providers>
 *           {children}
 *         </Providers>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 *
 * This ensures that all pages and components in the app have access
 * to the Redux store and can use the typed hooks for state management.
 */
