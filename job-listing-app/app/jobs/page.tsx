type JobDetail = {
  title: string;
  company: string;
  description: string;
  responsibilities: string[];
  traits: string[];
  skills: string[];
  location: string;
  posted_date: string;
  deadline: string;
  color: string;
};

const jobData: { [key: string]: JobDetail } = {
  "1": {
    title: "Social Media Manager",
    company: "ABC Media",
    description:
      "As a Social Media Assistant, you will work closely with the social media manager or marketing team to execute social media strategies and campaigns. You will be responsible for assisting in the creation and scheduling of engaging content, monitoring social media channels, and interacting with followers.",
    responsibilities: [
      "Community engagement to ensure that is supported and actively represented online",
      "Focus on social media content development and publication",
      "Marketing and strategy support",
      "Stay on top of trends on social media platforms, and suggest content ideas to the team",
      "Engage with online communities",
    ],
    traits: [
      "Passionate & Reliable: Genuine interest in our mission and a strong desire to make a positive impact",
      "Adaptable, Team Player & Strong Communication Skills: Able to work effectively in diverse teams",
      "Respectful: Embraces diversity, inclusive, and treats others with respect",
    ],
    skills: ["Social Media Marketing", "English", "Copywriting"],
    location: "Addis Ababa",
    posted_date: "Jul 1, 2023",
    deadline: "Jul 31, 2023",
    color: "bg-yellow-500",
  },
  "2": {
    title: "Web Developer",
    company: "Tech Innovators",
    description:
      "As a Web Developer, you will be responsible for designing, coding, and modifying websites, from layout to function according to a client's specifications. You will create visually appealing sites that feature user-friendly design and clear navigation.",
    responsibilities: [
      "Write well designed, testable, efficient code by using best software development practices",
      "Create website layout/user interface by using standard HTML/CSS practices",
      "Integrate data from various back-end services and databases",
      "Gather and refine specifications and requirements based on technical needs",
    ],
    traits: [
      "Strong organizational skills to juggle multiple tasks within the constraints of timelines",
      "Ability to work and thrive in a fast-paced environment, learn rapidly",
      "Team player with a positive attitude and good interpersonal skills",
    ],
    skills: ["HTML", "CSS", "JavaScript", "PHP"],
    location: "Addis Ababa",
    posted_date: "Jan 15, 2023",
    deadline: "Feb 5, 2023",
    color: "bg-blue-500",
  },
  "3": {
    title: "Graphic Designer",
    company: "Creative Designs Co.",
    description:
      "As a Graphic Designer, you will create visual concepts, using computer software or by hand, to communicate ideas that inspire, inform, and captivate consumers. You will develop the overall layout and production design for various applications.",
    responsibilities: [
      "Develop graphics for product illustrations, logos, and websites",
      "Select colors, images, text style, and layout",
      "Present the design to clients or the art director",
      "Incorporate changes recommended by the clients into the final design",
    ],
    traits: [
      "A keen eye for aesthetics and details",
      "Excellent communication skills",
      "Ability to work methodically and meet deadlines",
    ],
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Creativity"],
    location: "Cape Town",
    posted_date: "Feb 1, 2023",
    deadline: "Feb 28, 2023",
    color: "bg-gray-800",
  },
  "4": {
    title: "Social Media Assistant",
    company: "Digital Marketing Inc.",
    description:
      "As a Social Media Assistant, you will help manage our clients' social media presence across multiple platforms. You'll create engaging content, respond to comments, and analyze performance metrics.",
    responsibilities: [
      "Create and schedule social media posts",
      "Respond to comments and messages",
      "Monitor social media trends",
      "Analyze engagement metrics and prepare reports",
    ],
    traits: [
      "Creative with excellent writing skills",
      "Understanding of social media platforms",
      "Ability to work independently and meet deadlines",
    ],
    skills: ["Content Creation", "Social Media Management", "Analytics"],
    location: "Remote",
    posted_date: "Mar 10, 2023",
    deadline: "Apr 10, 2023",
    color: "bg-orange-500",
  },
};

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job: JobDetail = jobData[params.id] || jobData["1"];

  return (
    <main className="min-h-screen">
      <div className="bg-gray-900 py-4 mb-6">
        <h1 className="text-center text-white text-xl">
          Applicant Dashboard / Description
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Job details */}
          <div className="md:col-span-2 border border-red-500 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h2 className="font-medium text-lg mb-2">Description</h2>
                <p className="text-sm text-gray-600">{job.description}</p>
              </div>

              <div>
                <h2 className="font-medium text-lg mb-2">Responsibilities</h2>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {job.responsibilities.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <h2 className="font-medium text-lg mb-2">Company</h2>
                <div className="absolute right-0 top-0">
                  <div className="bg-orange-500 text-white px-4 py-1 rounded-md font-medium">
                    Finot
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {job.company} is a leading company in its industry, providing
                  innovative solutions and services to clients worldwide.
                </p>
              </div>

              <div>
                <h2 className="font-medium text-lg mb-2">
                  Ideal Candidate we need
                </h2>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {job.traits.map((trait: string, index: number) => (
                    <li key={index}>{trait}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-medium text-lg mb-2">Skills & Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Application details */}
          <div className="border border-green-500 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h2 className="font-medium text-lg mb-4">Job Info</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Job Title</p>
                    <p className="font-medium">{job.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Posted Date</p>
                    <p className="font-medium">{job.posted_date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Deadline</p>
                    <p className="font-medium">{job.deadline}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Job Type</p>
                    <p className="font-medium">Full-time</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium text-lg mb-4">Company</h2>
                <div className="flex items-center gap-3">
                  <div
                    className={`${job.color} w-10 h-10 rounded-full flex items-center justify-center`}
                  >
                    <span className="text-white text-sm font-bold">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium text-lg mb-4">Required Skills</h2>
                <div className="space-y-2">
                  {job.skills.map((skill: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <p className="text-sm">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
