"use client"

interface ApplicantCardProps {
  applicant: {
    id: number
    name: string
    email: string
    avatar: string
    appliedDate: string
    status: string
    experience: string
    skills: string[]
  }
  onAccept: () => void
  onReject: () => void
  onViewProfile: () => void
}

export function ApplicantCard({ applicant, onAccept, onReject, onViewProfile }: ApplicantCardProps) {
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

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
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
          onClick={onAccept}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
        >
          Accept
        </button>
        <button
          onClick={onReject}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
        >
          Reject
        </button>
        <button
          onClick={onViewProfile}
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  )
}
