"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { JobCard } from "./components/job-card"
import { jobsData } from "./data/jobs"
import type { JobPosting } from "./types/job"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  // Get unique categories and locations for filters
  const categories = Array.from(new Set(jobsData.job_postings.flatMap((job) => job.about.categories)))
  const locations = Array.from(new Set(jobsData.job_postings.map((job) => job.about.location)))

  // Filter jobs based on search and filters
  const filteredJobs = jobsData.job_postings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || job.about.categories.includes(selectedCategory)
    const matchesLocation = selectedLocation === "all" || job.about.location === selectedLocation

    return matchesSearch && matchesCategory && matchesLocation
  })

  const handleApply = (job: JobPosting) => {
    alert(`Applied to ${job.title} at ${job.company}!`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-normal text-orange-500 leading-tight">
            Find your next
            <br />
            opportunity
          </h1>
          <p className="text-gray-700 text-sm leading-relaxed max-w-md mx-auto">
            Discover amazing job opportunities that match your skills and interests. Start your career journey with us
            today.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs, companies, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Showing {filteredJobs.length} of {jobsData.job_postings.length} jobs
          </p>
        </div>

        {/* Job listings */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => <JobCard key={index} job={job} onApply={handleApply} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No jobs found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
