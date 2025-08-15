"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight } from "lucide-react"
import { jobsData } from "./data/jobs"

export default function Component() {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [showJobData, setShowJobData] = useState(false)

  const handleBegin = () => {
    // Show the dummy job data when Begin is clicked
    setShowJobData(true)
    console.log("Job postings data:", jobsData)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Main heading - exactly as in Figma */}
        <h1 className="text-2xl font-normal text-orange-500 leading-tight">
          {"Let's confirm you are"}
          <br />
          {"human"}
        </h1>

        {/* Description text - exactly as in Figma */}
        <p className="text-gray-700 text-sm leading-relaxed max-w-xs mx-auto">
          Complete the security check before continuing. This step verifies that you are not a bot, which helps to
          protect your account and prevent spam.
        </p>

        {/* Begin button - exactly as in Figma */}
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded font-medium"
          size="default"
          onClick={handleBegin}
        >
          Begin
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>

        {/* Language selector - exactly as in Figma */}
        <div className="pt-8">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-32 mx-auto border-gray-300 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Español</SelectItem>
              <SelectItem value="french">Français</SelectItem>
              <SelectItem value="german">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hidden job data that gets logged when Begin is clicked */}
        {showJobData && (
          <div className="hidden">
            {/* This contains all the job data but is hidden from view */}
            {jobsData.job_postings.map((job, index) => (
              <div key={index}>
                <span>{job.title}</span>
                <span>{job.company}</span>
                <span>{job.about.location}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
