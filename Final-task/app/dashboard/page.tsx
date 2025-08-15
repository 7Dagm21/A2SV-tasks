"use client"

import { useState } from "react"
import Link from "next/link"

// Sample applicant data
const applicantsData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    avatar: "/avatars/john.jpg",
    appliedDate: "2023-07-15",
    status: "pending",
    experience: "3 years",
    skills: ["React", "JavaScript", "Node.js"],
    jobTitle: "Web Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    avatar: "/avatars/jane.jpg",
    appliedDate: "2023-07-14",
    status: "interview",
    experience: "5 years",
    skills: ["Python", "Django", "PostgreSQL"],
    jobTitle: "Data Analyst",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    avatar: "/avatars/mike.jpg",
    appliedDate: "2023-07-13",
    status: "rejected",
    experience: "2 years",
    skills: ["Vue.js", "CSS", "HTML"],
    jobTitle: "Graphic Designer",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    avatar: "/avatars/sarah.jpg",
    appliedDate: "2023-07-12",
    status: "hired",
    experience: "4 years",
    skills: ["Social Media", "Content Creation", "Analytics"],
    jobTitle: "Social Media Manager",
  },
]

export default function ApplicantsDashboard() {
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      interview: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      hired: "bg-blue-100 text-blue-800",
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const filteredApplicants = applicantsData.filter((applicant) =>
    selectedStatus === "all" ? true : applicant.status === selectedStatus,
  )

  const handleAction = (action: string, applicantName: string) => {
    alert(`${action} action for ${applicantName}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Job Portal</h1>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Jobs
              </Link>
              <Link href="/dashboard" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Applicants Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Applicants Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Manage job applications and review candidates</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Controls */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="interview">Interview</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applicants List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Job Applicants</h2>
            <p className="text-sm text-gray-500">{filteredApplicants.length} total applications</p>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredApplicants.map((applicant) => (
              <div key={applicant.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={applicant.avatar || "/placeholder.svg?height=48&width=48"}
                      alt={applicant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{applicant.name}</h3>
                      <p className="text-sm text-gray-500">{applicant.email}</p>
                      <p className="text-sm text-gray-500">Applied for: {applicant.jobTitle}</p>
                      <p className="text-sm text-gray-500">Experience: {applicant.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(applicant.status)}
                    <div className="text-sm text-gray-500">Applied: {applicant.appliedDate}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAction("Accept", applicant.name)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction("Reject", applicant.name)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction("View Profile", applicant.name)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
