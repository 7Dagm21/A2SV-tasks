"use client";
import Link from "next/link";

// Same job data as in the main page
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

// Function to get company logo color based on company name
const getCompanyLogoColor = (company: string) => {
  const colors = [
    "bg-yellow-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-red-500",
  ];
  return colors[company.length % colors.length];
};

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const jobIndex = Number.parseInt(params.id);
  const job = jobsData.job_postings[jobIndex] || jobsData.job_postings[0];

  return (
    <div className="min-h-screen py-12">
      {/* Main Content */}
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal Candidate */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Ideal Candidate we want
                </h2>
                <div className="space-y-4">
                  <div className="text-gray-700">
                    <span className="font-medium">• </span>
                    {job.ideal_candidate.age !== "Any" &&
                      `${job.ideal_candidate.age} year old `}
                    {job.ideal_candidate.gender !== "Any" &&
                      `${job.ideal_candidate.gender} `}
                    {job.title.toLowerCase()}
                  </div>
                  {job.ideal_candidate.traits.map((trait, index) => (
                    <div key={index} className="text-gray-700">
                      <span className="font-medium">• </span>
                      {trait}
                    </div>
                  ))}
                </div>
              </div>

              {/* When & Where */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  When & Where
                </h2>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{job.when_where}</p>
                </div>
              </div>
            </div>

            {/* Right Column - About */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  About
                </h2>

                <div className="space-y-6">
                  {/* Posted On */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="/icons/posted on.png"
                        alt="Posted date"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted On</p>
                      <p className="font-medium text-gray-900">
                        {job.about.posted_on}
                      </p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="/icons/deadline.png"
                        alt="Deadline"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-medium text-gray-900">
                        {job.about.deadline}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="/icons/location.png"
                        alt="Location"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">
                        {job.about.location}
                      </p>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="/icons/start date.png"
                        alt="Start date"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium text-gray-900">
                        {job.about.start_date}
                      </p>
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="/icons/end date.png"
                        alt="End date"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium text-gray-900">
                        {job.about.end_date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Categories
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {job.about.categories.map((category, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          category === "Marketing" ||
                          category === "Design" ||
                          category === "Art"
                            ? "bg-yellow-100 text-yellow-800"
                            : category === "IT" || category === "Development"
                            ? "bg-teal-100 text-teal-800"
                            : category === "Data Science" ||
                              category === "Analytics"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Required Skills */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Required Skills
                  </h3>
                  <div className="space-y-2">
                    {job.about.required_skills.map((skill, index) => (
                      <div key={index} className="text-gray-700 text-sm">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
