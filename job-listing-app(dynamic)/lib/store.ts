/**
 * Redux Store Configuration
 *
 * This file configures the main Redux store for the application using Redux Toolkit.
 * The store is the central state container that holds the entire state tree of the app.
 *
 * Features:
 * - Centralized state management for job opportunities
 * - Redux Toolkit for simplified Redux logic
 * - TypeScript integration for type-safe state access
 * - Development tools integration for debugging
 *
 * The store is configured with:
 * - Jobs slice for managing job-related state
 * - Proper TypeScript types for state and dispatch
 * - Redux DevTools extension support (in development)
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./features/opportunitySlice";

/**
 * Configure and create the Redux store
 *
 * Uses Redux Toolkit's configureStore which provides:
 * - Good defaults for store setup
 * - Built-in Redux DevTools extension support
 * - Automatic Redux Thunk middleware
 * - Immutability and serializability checks in development
 * - Hot reloading support
 */
export const store = configureStore({
  reducer: {
    // Jobs slice manages all job-related state
    // This includes job listings, current job details, loading states, and errors
    jobs: jobsReducer,

    // Additional slices can be added here as the application grows
    // Example: auth: authReducer, user: userReducer, etc.
  },

  // Redux Toolkit automatically adds these middleware in development:
  // - redux-thunk for async actions
  // - Immutability check middleware
  // - Serializability check middleware
  // - Action creator check middleware

  // Additional middleware can be added here if needed:
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(customMiddleware),
});

/**
 * TypeScript type for the root state
 *
 * This type represents the shape of the entire Redux state tree.
 * It's automatically inferred from the store's reducer configuration.
 * Used throughout the app for type-safe state access.
 *
 * Example usage:
 * const jobs = useSelector((state: RootState) => state.jobs.jobs)
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * TypeScript type for the dispatch function
 *
 * This type includes all the action creators and async thunks
 * that can be dispatched to the store. Ensures type safety
 * when dispatching actions.
 *
 * Example usage:
 * const dispatch: AppDispatch = useDispatch()
 * dispatch(fetchJobs())
 */
export type AppDispatch = typeof store.dispatch;
