import { ExperienceRecord } from '../types/data';

export const experienceData: ExperienceRecord[] = [
  {
    id: "exp-001",
    role: "B.Tech in Artificial Intelligence and Data Science",
    company: "Sri Eshwar College of Engineering",
    duration: "2021 - 2025",
    location: "Coimbatore, India",
    responsibilities: [
      "CGPA: 8.92/10",
      "Specialized in AI, Machine Learning, and Data Structures.",
      "Led technical initiatives and development clubs."
    ],
    classification: "UNCLASSIFIED"
  },
  {
    id: "exp-002",
    role: "Full Stack Developer Intern",
    company: "Yatrikart",
    duration: "May 2024 - June 2024",
    location: "Indore, India",
    responsibilities: [
      "Built Admin Dashboard with complete order management workflow.",
      "Integrated AWS S3 for secure file uploads.",
      "Implemented comprehensive invoice generation logic.",
      "Worked heavily with Next.js, React, Node.js, and MongoDB."
    ],
    classification: "CONFIDENTIAL"
  },
  {
    id: "exp-003",
    role: "Technical Lead",
    company: "Byte Club",
    duration: "Aug 2023 - Present",
    location: "Sri Eshwar College of Engineering",
    responsibilities: [
      "Orchestrated large-scale technical events and hackathons.",
      "Mentored junior developers in modern web technologies.",
      "Managed the development of internal club platforms."
    ],
    classification: "SECRET"
  }
];
