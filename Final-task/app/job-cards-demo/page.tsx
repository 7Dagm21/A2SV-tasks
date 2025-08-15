"use client";

// Using the unified JobCard component (job-card-component deprecated)
import { JobCard } from "@/components/JobCard";
import { jobsData } from "@/data/jobs";

export default function JobCardsDemo() {
  const handleApply = (jobTitle: string) => {
    alert(`Applied to ${jobTitle}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Cards Demo
          </h1>
          <p className="text-gray-600">
            Individual job card components with dummy data
          </p>
        </div>

        <div className="space-y-6">
          {jobsData.job_postings.map((job, index) => (
            <JobCard
              key={index}
              job={{
                // Map legacy shape to TransformedJob minimal fields used by JobCard
                id: `${index}`,
                title: job.title,
                company: job.company,
                description: job.description,
                responsibilities: [],
                ideal_candidate: { traits: [] },
                skills: job.skills || [],
                about: {
                  posted_on: job.about.posted_on,
                  deadline: job.about.deadline,
                  location: job.about.location,
                  start_date: job.about.posted_on,
                  end_date: job.about.deadline,
                  categories: job.about.categories,
                  required_skills: job.skills || [],
                },
                when_where: job.about.location,
                image: job.image,
                logoUrl: job.image,
              }}
              onAuthRequired={() => alert("Please authenticate to bookmark")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
