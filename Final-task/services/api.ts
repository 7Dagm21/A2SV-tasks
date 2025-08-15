/**
 * API Service for Job Opportunities
 * Handles all API calls to the Akil Backend
 */

// Base URL for the API
const API_BASE_URL = "https://akil-backend.onrender.com"

// API Response Types based on the documentation
export interface ApiJobOpportunity {
  id: string
  title: string
  description: string
  responsibilities: string
  requirements: string
  idealCandidate: string
  categories: string[]
  opType: string
  startDate: string
  endDate: string
  deadline: string
  location: string[]
  requiredSkills: string[]
  whenAndWhere: string
  orgID: string
  datePosted: string
  status: string
  applicantsCount: number
  viewsCount: number
  orgName: string
  logoUrl: string
  isBookmarked: boolean
  isRolling: boolean
  questions: string | null
  perksAndBenefits: string | null
  createdAt: string
  updatedAt: string
  orgPrimaryPhone: string
  orgEmail: string
  orgWebsite: string
  orgLogo: string
  isVerified: boolean
  industry: string
  companySize: string
}

export interface ApiResponse {
  success: boolean
  message: string
  data: ApiJobOpportunity[]
  errors: any
  count: number
}

export interface SingleJobApiResponse {
  success: boolean
  message: string
  data: ApiJobOpportunity
  errors: any
}

// Transformed job type for our application
export interface TransformedJob {
  id: string
  title: string
  company: string
  description: string
  responsibilities: string[]
  ideal_candidate: {
    traits: string[]
  }
  skills: string[]
  about: {
    posted_on: string
    deadline: string
    location: string
    start_date: string
    end_date: string
    categories: string[]
    required_skills: string[]
  }
  when_where: string
  image: string
  logoUrl?: string
  orgName: string
  applicantsCount: number
  viewsCount: number
}

/**
 * Fetches all job opportunities from the API
 * @returns Promise<TransformedJob[]> - Array of transformed job opportunities
 * @throws Error if the API request fails
 */
export async function fetchJobOpportunities(): Promise<TransformedJob[]> {
  try {
    console.log("🔄 Fetching job opportunities from API...")

    // Make API request to get all opportunities
    const response = await fetch(`${API_BASE_URL}/opportunities/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }

    // Parse the JSON response
    const apiData: ApiResponse = await response.json()

    // Check if the API returned success
    if (!apiData.success) {
      throw new Error(`API Error: ${apiData.message}`)
    }

    // Validate that data is an array
    if (!Array.isArray(apiData.data)) {
      throw new Error("API response data is not an array")
    }

    console.log(`✅ Successfully fetched ${apiData.data.length} job opportunities`)

    // Transform the API data to match our application structure
    const transformedJobs = apiData.data.map(transformApiJobToAppFormat)

    return transformedJobs
  } catch (error) {
    console.error("❌ Error fetching job opportunities:", error)

    // Re-throw the error with additional context
    if (error instanceof Error) {
      throw new Error(`Failed to fetch job opportunities: ${error.message}`)
    } else {
      throw new Error("Failed to fetch job opportunities: Unknown error")
    }
  }
}

/**
 * Fetches a single job opportunity by ID from the API
 * @param id - The job opportunity ID
 * @returns Promise<TransformedJob> - Single transformed job opportunity
 * @throws Error if the API request fails or job is not found
 */
export async function fetchJobById(id: string): Promise<TransformedJob> {
  try {
    console.log(`🔄 Fetching job opportunity with ID: ${id}`)

    // Make API request to get specific opportunity
    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    // Check if the response is successful
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Job opportunity not found")
      }
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }

    // Parse the JSON response
    const apiData: SingleJobApiResponse = await response.json()

    // Check if the API returned success
    if (!apiData.success) {
      throw new Error(`API Error: ${apiData.message}`)
    }

    // Validate that data exists
    if (!apiData.data) {
      throw new Error("Job opportunity data not found")
    }

    console.log(`✅ Successfully fetched job opportunity: ${apiData.data.title}`)

    // Transform the API data to match our application structure
    const transformedJob = transformApiJobToAppFormat(apiData.data)

    return transformedJob
  } catch (error) {
    console.error(`❌ Error fetching job with ID ${id}:`, error)

    // Re-throw the error with additional context
    if (error instanceof Error) {
      throw new Error(`Failed to fetch job: ${error.message}`)
    } else {
      throw new Error("Failed to fetch job: Unknown error")
    }
  }
}

/**
 * Transforms API job data to match our application's data structure
 * @param apiJob - Raw API job data
 * @returns TransformedJob - Transformed job data for the application
 */
function transformApiJobToAppFormat(apiJob: ApiJobOpportunity): TransformedJob {
  return {
    id: apiJob.id,
    title: apiJob.title,
    company: apiJob.orgName,
    orgName: apiJob.orgName,
    description: apiJob.description,

    // Split responsibilities by newlines and filter empty strings
    responsibilities: apiJob.responsibilities
      ? apiJob.responsibilities.split("\n").filter((r) => r.trim().length > 0)
      : [],

    // Parse ideal candidate traits
    ideal_candidate: {
      traits: apiJob.idealCandidate ? apiJob.idealCandidate.split("\n").filter((t) => t.trim().length > 0) : [],
    },

    // Use required skills from API
    skills: apiJob.requiredSkills || [],

    // Transform about section
    about: {
      posted_on: formatApiDate(apiJob.datePosted),
      deadline: formatApiDate(apiJob.deadline),
      location: Array.isArray(apiJob.location) ? apiJob.location.join(", ") : apiJob.location || "Remote",
      start_date: formatApiDate(apiJob.startDate),
      end_date: formatApiDate(apiJob.endDate),
      categories: apiJob.categories || [],
      required_skills: apiJob.requiredSkills || [],
    },

    // When and where information
    when_where: apiJob.whenAndWhere || "Details will be provided upon selection",

    // Company logo/image
    image: apiJob.logoUrl || apiJob.orgLogo || "/placeholder.svg",
    logoUrl: apiJob.logoUrl || apiJob.orgLogo,

    // Additional metadata
    applicantsCount: apiJob.applicantsCount || 0,
    viewsCount: apiJob.viewsCount || 0,
  }
}

/**
 * Formats API date string to a more readable format
 * @param dateString - ISO date string from API
 * @returns Formatted date string
 */
function formatApiDate(dateString: string): string {
  if (!dateString) {
    return "Not specified"
  }

  try {
    const date = new Date(dateString)

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString // Return original if invalid
    }

    // Format to readable date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch (error) {
    console.warn("Error formatting date:", dateString, error)
    return dateString // Return original string if formatting fails
  }
}

/**
 * Utility function to check if the API is reachable
 * @returns Promise<boolean> - True if API is reachable, false otherwise
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/search`, {
      method: "HEAD", // Use HEAD to check without downloading data
      headers: {
        Accept: "application/json",
      },
    })

    return response.ok
  } catch (error) {
    console.warn("API health check failed:", error)
    return false
  }
}
