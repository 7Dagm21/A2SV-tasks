export interface JobPosting {
  id: string
  title: string
  company: string
  description: string
  responsibilities: string[]
  ideal_candidate: {
    traits: string[]
  }
  skills: string[]
  location: string
  posted_date: string
  deadline: string
  logo: string
  color: string
}
