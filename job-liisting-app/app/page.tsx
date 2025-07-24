"use client";

import { useState } from "react";
import Link from "next/link";

const jobsData = {
  job_postings: [
    {
      title: "Social media manager",
      description:
        "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns. You will be responsible for assisting in the creation and scheduling of engaging content, monitoring social media channels, and interacting with followers. Your primary goal will be to enhance brand visibility, foster positive relationships with the audience, and drive engagement and conversions.",
      responsibilities: [
        "Community engagement to ensure that is supported and actively represented online",
        "Focus on social media content development and publication",
        "Marketing and strategy support",
        "Stay on top of trends on social media platforms, and suggest content ideas to the team",
        "Engage with online communities",
      ],
      ideal_candidate: {
        age: "18-24",
        gender: "Female",
        traits: [
          "Passionate & Reliable: Genuine interest in our mission and a strong desire to make a positive impact, responsible, and committed to fulfilling volunteer commitments.",
          "Adaptable, Team Player & Strong Communication Skills: Able to work effectively in diverse teams; and contributes positively. Flexible and open to embracing new challenges and shifting priorities; Clear verbal and written communication, active listening, and constructive feedback.",
          "Respectful: Embraces diversity, inclusive, and treats others with respect. Abides with all our rules and regulations.",
        ],
      },
      when_where:
        "The onboarding event for this event will take place on Jan 18th, 2023 in AAU Auditorium.",
      about: {
        posted_on: "Jul 1, 2023",
        deadline: "Jul 31, 2023",
        location: "Addis Ababa",
        start_date: "Aug 02, 2023",
        end_date: "Sep 02, 2023",
        categories: ["Marketing", "Design"],
        required_skills: ["Social Media Marketing", "English", "Copywriting"],
      },
      company: "ABC Media",
      image: "company-logos/job1.png", 
    },
    {
      title: "Web developer",
      description:
        "As a Web Developer, you will be responsible for designing, coding, and modifying websites, from layout to function according to a client's specifications. You will create visually appealing sites that feature user-friendly design and clear navigation.",
      responsibilities: [
        "Write well designed, testable, efficient code by using best software development practices",
        "Create website layout/user interface by using standard HTML/CSS practices",
        "Integrate data from various back-end services and databases",
        "Gather and refine specifications and requirements based on technical needs",
        "Create and maintain software documentation",
      ],
      ideal_candidate: {
        age: "Any",
        gender: "Any",
        traits: [
          "Strong organizational skills to juggle multiple tasks within the constraints of timelines and budgets",
          "Ability to work and thrive in a fast-paced environment, learn rapidly, and master diverse web technologies and techniques",
          "Team player with a positive attitude and good interpersonal skills",
        ],
      },
      when_where:
        "The onboarding event for this event will take place on Feb 10th, 2023 in BBIT Building, Room 202.",
      about: {
        posted_on: "Jan 15, 2023",
        deadline: "Feb 5, 2023",
        location: "Addis Ababa, Ethiopia",
        start_date: "Feb 15, 2023",
        end_date: "Aug 15, 2023",
        categories: ["IT", "Development"],
        required_skills: ["HTML", "CSS", "JavaScript", "PHP"],
      },
      company: "Tech Innovators",
      image: "company-logos/job2.jpeg",
    },
    {
      title: "Graphic designer",
      description:
        "As a Graphic Designer, you will create visual concepts, using computer software or by hand, to communicate ideas that inspire, inform, and captivate consumers. You will develop the overall layout and production design for various applications such as advertisements, brochures, magazines, and corporate reports.",
      responsibilities: [
        "Develop graphics for product illustrations, logos, and websites",
        "Select colors, images, text style, and layout",
        "Present the design to clients or the art director",
        "Incorporate changes recommended by the clients into the final design",
        "Review designs for errors before printing or publishing them",
      ],
      ideal_candidate: {
        age: "Any",
        gender: "Any",
        traits: [
          "A keen eye for aesthetics and details",
          "Excellent communication skills",
          "Ability to work methodically and meet deadlines",
          "Passionate about creating stunning visuals and innovative designs",
        ],
      },
      when_where:
        "The onboarding event for this event will take place on Mar 5th, 2023 in Design Studio, 3rd Floor.",
      about: {
        posted_on: "Feb 1, 2023",
        deadline: "Feb 28, 2023",
        location: "Cape Town, South Africa",
        start_date: "Mar 10, 2023",
        end_date: "Sep 10, 2023",
        categories: ["Design", "Art"],
        required_skills: [
          "Adobe Photoshop",
          "Adobe Illustrator",
          "Creativity",
          "Attention to detail",
        ],
      },
      company: "Creative Designs Co.",
      image: "company-logos/job3.jpg",
    },
    {
      title: "Data analyst",
      description:
        "As a Data Analyst, you will be responsible for analyzing data sets to identify trends, patterns, and insights that can help inform business decisions. You will work closely with different departments to gather and interpret data, create reports, and provide recommendations based on your findings.",
      responsibilities: [
        "Interpret data, analyze results using statistical techniques and provide ongoing reports",
        "Develop and implement databases, data collection systems, data analytics, and other strategies",
        "Acquire data from primary or secondary data sources and maintain databases/data systems",
        "Identify, analyze, and interpret trends or patterns in complex data sets",
        "Filter and clean data by reviewing computer reports, printouts, and performance indicators",
      ],
      ideal_candidate: {
        age: "Any",
        gender: "Any",
        traits: [
          "Strong analytical skills with the ability to collect, organize, analyze, and disseminate significant amounts of information",
          "Technical expertise regarding data models, database design development, data mining, and segmentation techniques",
          "Excellent written and verbal communication skills",
          "Ability to work independently and as part of a team",
        ],
      },
      when_where:
        "The onboarding event for this event will take place on Apr 12th, 2023 in Conference Room B.",
      about: {
        posted_on: "Mar 10, 2023",
        deadline: "Apr 1, 2023",
        location: "Lagos, Nigeria",
        start_date: "Apr 15, 2023",
        end_date: "Oct 15, 2023",
        categories: ["Data Science", "Analytics"],
        required_skills: ["SQL", "Python", "Excel", "Statistical Analysis"],
      },
      company: "Data Insights Inc.",
      image: "company-logos/job4.png",
    },
    {
      title: "Customer support specialist",
      description:
        "As a Customer Support Specialist, you will provide product/services information and resolve any emerging problems that our customers might face with accuracy and efficiency. You will be patient, empathetic, and passionately communicative.",
      responsibilities: [
        "Manage large amounts of incoming calls and emails",
        "Identify and assess customers' needs to achieve satisfaction",
        "Build sustainable relationships and trust with customer accounts through open and interactive communication",
        "Provide accurate, valid, and complete information by using the right methods/tools",
        "Handle customer complaints, provide appropriate solutions and alternatives within the time limits; follow up to ensure resolution",
      ],
      ideal_candidate: {
        age: "Any",
        gender: "Any",
        traits: [
          "Strong phone contact handling skills and active listening",
          "Customer orientation and ability to adapt/respond to different types of characters",
          "Excellent communication and presentation skills",
          "Ability to multi-task, prioritize, and manage time effectively",
        ],
      },
      when_where:
        "The onboarding event for this event will take place on May 20th, 2023 in Customer Support Center, Ground Floor.",
      about: {
        posted_on: "Apr 15, 2023",
        deadline: "May 10, 2023",
        location: "Accra, Ghana",
        start_date: "May 25, 2023",
        end_date: "Nov 25, 2023",
        categories: ["Customer Service", "Support"],
        required_skills: [
          "Communication Skills",
          "Problem Solving",
          "Patience",
          "Attention to Detail",
        ],
      },
      company: "Customer Care Ltd.",
      image: "company-logos/job5.png", 
    },
  ],
};


const getCompanyLogoColor = (company: string) => {
  const colorMap: { [key: string]: string } = {
    "ABC Media": "bg-yellow-500",
    "Tech Innovators": "bg-blue-500",
    "Creative Designs Co.": "bg-purple-500",
    "Data Insights Inc.": "bg-green-500",
    "Customer Care Ltd.": "bg-red-500",
  };
  return colorMap[company] || "bg-gray-500";
};

export default function LandingPage() {
  const [sortBy, setSortBy] = useState("most-relevant");

  // Function to parse date strings like "Jul 1, 2023" to Date objects
  const parseDate = (dateString: string) => {
    return new Date(dateString);
  };

  // Function to sort jobs based on selected option
  const getSortedJobs = () => {
    const jobs = [...jobsData.job_postings];

    switch (sortBy) {
      case "newest-first":
        return jobs.sort(
          (a, b) =>
            parseDate(b.about.posted_on).getTime() -
            parseDate(a.about.posted_on).getTime()
        );
      case "oldest-first":
        return jobs.sort(
          (a, b) =>
            parseDate(a.about.posted_on).getTime() -
            parseDate(b.about.posted_on).getTime()
        );
      case "most-relevant":
      default:
        return jobs; 
    }
  };

  const sortedJobs = getSortedJobs();
  return (
    <div className="min-h-screen py-12">
      


      {/* Main Content */}
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto  py-12">

          {/* Title and Sort */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Opportunities
              </h1>
              <p className="text-gray-500 text-sm">
                Showing {sortedJobs.length} results
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                className="text-sm border border-gray-300 rounded px-2 py-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="most-relevant">Most relevant</option>
                <option value="newest-first">Newest first</option>
                <option value="oldest-first">Oldest first</option>
              </select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {sortedJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Company Logo Avatar */}

                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={job.image || "/placeholder.svg"}
                      alt={`${job.company} logo`}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // Hide the image and show fallback
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />

                    {/* Fallback: Company initials with specific colors */}
                    <div
                      className={`w-full h-full rounded-full hidden items-center justify-center ${getCompanyLogoColor(
                        job.company
                      )}`}
                    >
                      <span className="text-white text-xl font-bold">
                        {job.company
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                  </div>

                  {/* Job Content */}
                  <div className="flex-1">
                    <div className="mb-2">
                      <Link
                        href={`/jobs/${index}`}
                        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {job.title}
                      </Link>

                      {/* Company name - this is the second line mentioned */}
                      <p className="text-gray-600 text-sm mt-1">
                        {job.company} • {job.about.location}
                      </p>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {job.description}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500 text-white">
                        In Person
                      </span>
                      {job.about.categories.map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            category === "Marketing" ||
                            category === "Design" ||
                            category === "Art"
                              ? "bg-yellow-500 text-white"
                              : category === "IT" || category === "Development"
                              ? "bg-gray-500 text-white"
                              : category === "Data Science" ||
                                category === "Analytics"
                              ? "bg-blue-500 text-white"
                              : "bg-purple-500 text-white"
                          }`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
