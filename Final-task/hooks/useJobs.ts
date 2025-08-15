"use client"

import { useState, useEffect } from "react"
import { fetchJobOpportunities, type TransformedJob } from "../services/api"

/**
 * Return type for the useJobs hook
 */
interface UseJobsReturn {
  jobs: TransformedJob[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  isEmpty: boolean
}

/**
 * Custom hook for managing job opportunities data
 * Handles fetching, loading states, and error management
 *
 * @returns UseJobsReturn - Jobs data, loading state, error state, and refetch function
 */
export function useJobs(): UseJobsReturn {
  // State management for jobs data
  const [jobs, setJobs] = useState<TransformedJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetches jobs from the API and updates state
   */
  const fetchJobs = async () => {
    try {
      // Set loading state and clear any previous errors
      setLoading(true)
      setError(null)

      console.log("🔄 Starting to fetch jobs...")

      // Fetch jobs from API
      const fetchedJobs = await fetchJobOpportunities()

      // Update jobs state with fetched data
      setJobs(fetchedJobs)

      console.log(`✅ Successfully loaded ${fetchedJobs.length} jobs in hook`)
    } catch (err) {
      // Handle and log errors
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch jobs"
      setError(errorMessage)
      console.error("❌ Error in useJobs hook:", errorMessage)

      // Set empty array on error to prevent showing stale data
      setJobs([])
    } finally {
      // Always set loading to false when done
      setLoading(false)
    }
  }

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs()
  }, [])

  return {
    jobs,
    loading,
    error,
    refetch: fetchJobs,
    isEmpty: !loading && !error && jobs.length === 0,
  }
}
