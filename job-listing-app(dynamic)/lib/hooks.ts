/**
 * Typed Redux Hooks
 *
 * This file provides pre-typed versions of the React-Redux hooks
 * for use throughout the application. These hooks ensure type safety
 * when accessing Redux state and dispatching actions.
 *
 * Benefits:
 * - Type safety: Prevents runtime errors from incorrect state access
 * - IntelliSense: Provides autocomplete for state properties and actions
 * - Consistency: Ensures all components use the same typed hooks
 * - Maintainability: Centralizes type definitions for easy updates
 *
 * Instead of using the generic useSelector and useDispatch hooks,
 * components should use these typed versions for better developer experience.
 *
 * @author Job Portal Team
 * @version 1.0.0
 */

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Typed version of useDispatch hook
 *
 * This hook returns a dispatch function that's typed with our AppDispatch type.
 * This ensures that only valid actions can be dispatched and provides
 * autocomplete for action creators and async thunks.
 *
 * Usage in components:
 * ```typescript
 * const dispatch = useAppDispatch()
 * dispatch(fetchJobs()) // ✅ Type-safe
 * dispatch(invalidAction()) // ❌ TypeScript error
 * ```
 *
 * @returns Typed dispatch function that accepts our app's actions
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed version of useSelector hook
 *
 * This hook is typed to work with our RootState, providing autocomplete
 * for state properties and ensuring type safety when accessing nested state.
 *
 * Usage in components:
 * ```typescript
 * const jobs = useAppSelector(state => state.jobs.jobs) // ✅ Type-safe
 * const loading = useAppSelector(state => state.jobs.loading) // ✅ Autocomplete
 * const invalid = useAppSelector(state => state.invalid) // ❌ TypeScript error
 * ```
 *
 * The TypedUseSelectorHook ensures that:
 * - The state parameter is typed as RootState
 * - Return type is inferred from the selector function
 * - Invalid state access is caught at compile time
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook Usage Best Practices:
 *
 * 1. **Always use these typed hooks instead of the generic ones**
 *    - ✅ useAppSelector, useAppDispatch
 *    - ❌ useSelector, useDispatch
 *
 * 2. **Use memoized selectors for expensive computations**
 *    ```typescript
 *    const expensiveData = useAppSelector(useMemo(() =>
 *      createSelector(
 *        state => state.jobs.jobs,
 *        jobs => jobs.filter(job => job.featured)
 *      ), []
 *    ))
 *    ```
 *
 * 3. **Destructure state at the component level, not in selectors**
 *    ```typescript
 *    // ✅ Good
 *    const { jobs, loading, error } = useAppSelector(state => state.jobs)
 *
 *    // ❌ Avoid (causes unnecessary re-renders)
 *    const jobs = useAppSelector(state => state.jobs.jobs)
 *    const loading = useAppSelector(state => state.jobs.loading)
 *    const error = useAppSelector(state => state.jobs.error)
 *    ```
 *
 * 4. **Use selectors from the slice when available**
 *    ```typescript
 *    import { selectSortedJobs } from '@/lib/features/jobs/jobsSlice'
 *    const sortedJobs = useAppSelector(selectSortedJobs)
 *    ```
 */

/**
 * Example Component Usage:
 *
 * ```typescript
 * import { useAppDispatch, useAppSelector } from '@/lib/hooks'
 * import { fetchJobs, selectJobs } from '@/lib/features/jobs/jobsSlice'
 *
 * export function JobsList() {
 *   const dispatch = useAppDispatch()
 *   const jobs = useAppSelector(selectJobs)
 *   const loading = useAppSelector(state => state.jobs.loading)
 *
 *   useEffect(() => {
 *     dispatch(fetchJobs())
 *   }, [dispatch])
 *
 *   if (loading) return <div>Loading...</div>
 *
 *   return (
 *     <div>
 *       {jobs.map(job => (
 *         <div key={job.id}>{job.title}</div>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
