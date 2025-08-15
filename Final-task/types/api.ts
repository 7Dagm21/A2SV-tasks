// API Response Types
export interface ApiJobPosting {
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
  data: ApiJobPosting[]
  errors: any
  count: number
}

// Transformed Job Type for our application
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
}
