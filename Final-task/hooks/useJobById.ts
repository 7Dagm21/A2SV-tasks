"use client"

import { useState, useEffect } from "react"
import { fetchJobById, type TransformedJob } from "../services/api"

/**
 * Return type for the useJobById hook
 */
interface UseJobByIdReturn {
  job: TransformedJob | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Custom hook for fetching a single job by ID
 * Handles fetching, loading states, and error management for individual jobs
 *
 * @param id - The job ID to fetch
 * @returns UseJobByIdReturn - Job data, loading state, error state, and refetch function
 */
export function useJobById(id: string): UseJobByIdReturn {
  // State management for single job data
  const [job, setJob] = useState<TransformedJob | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetches a single job by ID from the API and updates state
   */
  const fetchJob = async () => {
    // Don't fetch if no ID provided
    if (!id) {
      setError("No job ID provided")
      setLoading(false)
      return
    }

    try {
      // Set loading state and clear any previous errors
      setLoading(true)
      setError(null)
      setJob(null) // Clear previous job data

      console.log(`🔄 Starting to fetch job with ID: ${id}`)

      // Fetch job from API
      const fetchedJob = await fetchJobById(id)

      // Update job state with fetched data
      setJob(fetchedJob)

      console.log(`✅ Successfully loaded job: ${fetchedJob.title}`)
    } catch (err) {
      // Handle and log errors
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch job"
      setError(errorMessage)
      console.error(`❌ Error fetching job ${id}:`, errorMessage)

      // Set job to null on error
      setJob(null)
    } finally {
      // Always set loading to false when done
      setLoading(false)
    }
  }

  // Fetch job when ID changes
  useEffect(() => {
    fetchJob()
  }, [id])

  return {
    job,
    loading,
    error,
    refetch: fetchJob,
  }
}
