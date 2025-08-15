"use client"

import { useState } from "react"
import Link from "next/link"

// Simple job data - no external imports needed
const jobsData = {
  job_postings: [
    {
      title: "Social Media Manager",
      company: "ABC Media",
      description:
        "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns.",
      about: {
        categories: ["Marketing", "Social Media"],
        location: "Addis Ababa",
      },
    },
    {
      title: "Web Developer",
      company: "Tech Innovators",
      description:
        "As a Web Developer, you will be responsible for designing, coding, and modifying websites, from layout to function according to a client's specifications.",
      about: {
        categories: ["Technology", "Development"],
        location: "Remote",
      },
    },
    {
      title: "Graphic Designer",
      company: "Creative Designs Co.",
      description:
        "As a Graphic Designer, you will create visual concepts, using computer software or by hand, to communicate ideas that inspire, inform, and captivate consumers.",
      about: {
        categories: ["Design", "Creative"],
        location: "Cape Town",
      },
    },
  ],
}

export default function JobsPage() {
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

    const matchesCategory =
      selectedCategory === "all" ||
      job.about.categories.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase())
    const matchesLocation =
      selectedLocation === "all" || job.about.location.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <main className="min-h-screen">
      <div className="bg-gray-900 py-4 mb-6">
        <h1 className="text-center text-white text-xl">Job List</h1>
      </div>

      <div className="max-w-md mx-auto px-4">
        <div className="bg-white border border-yellow-500 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <div className="text-yellow-500 text-xl">⚠️</div>
            <div>
              <h3 className="text-yellow-500 font-medium">Your Profile is Incomplete</h3>
              <p className="text-sm text-gray-600 mt-1">
                Complete your profile to increase your chances of getting hired. Add your skills, experience, and a
                professional photo to make your profile stand out to employers.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center py-8">
          <Link href="/" className="text-orange-500 hover:text-orange-600">
            Back to Landing Page
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Your Perfect Job</h1>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location.toLowerCase()}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing <span className="font-medium">{filteredJobs.length}</span> jobs
            </p>
          </div>

          {/* Job listings */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div
                  key={index}
                  className="w-full bg-white border border-gray-200 hover:shadow-md transition-shadow rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Link
                        href={`/jobs/${index + 1}`}
                        className="text-lg font-medium text-gray-900 hover:text-orange-500"
                      >
                        {job.title}
                      </Link>
                      <p className="text-orange-500">{job.company}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <p className="text-gray-700 text-sm">{job.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {job.about.categories.map((category, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-gray-600">
                      <span>📍 {job.about.location}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">No jobs found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
