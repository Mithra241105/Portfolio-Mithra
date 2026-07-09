import { Project } from '../types/data';

export const projectsData: Project[] = [
  {
    id: "proj-001",
    caseNumber: "CASE #001",
    title: "EduFlash",
    classification: "TOP SECRET",
    status: "COMPLETED",
    summary: "AI Smart Classroom Platform",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI"],
    evidenceImages: ["/images/projects/eduflash-1.jpg"],
    
    // Investigation Module Fields
    problemStatement: "Traditional classroom settings lack personalized feedback loops for students, leading to disengagement and knowledge gaps.",
    solution: "Developed an AI-driven smart classroom platform that tracks student progress in real-time, offering dynamic quizzes and automated grading.",
    architecture: "Serverless architecture using Vercel, Next.js for SSR, PostgreSQL for data persistence, and OpenAI APIs for NLP processing.",
    features: [
      "Real-time student progress tracking",
      "Automated essay grading using LLMs",
      "Dynamic flashcard generation",
      "Teacher dashboard with analytics"
    ],
    screenshots: [
      "/images/projects/eduflash-1.jpg",
      "/images/projects/eduflash-2.jpg",
      "/images/projects/eduflash-3.jpg"
    ],
    challenges: [
      "Optimizing LLM response times for real-time grading",
      "Ensuring data privacy and compliance with student data",
      "Building a scalable real-time WebSocket infrastructure"
    ],
    futureImprovements: [
      "Voice-interactive tutoring sessions",
      "Integration with Google Classroom",
      "Mobile application for on-the-go learning"
    ],
    techBadges: ["Next.js", "React", "PostgreSQL", "OpenAI API", "WebSockets"],
    timeline: "Jan 2024 - Apr 2024",
    links: {
      githubUrl: "https://github.com/mithras/eduflash",
      liveUrl: "https://eduflash.app"
    }
  },
  {
    id: "proj-002",
    caseNumber: "CASE #002",
    title: "SkillMorph",
    classification: "SECRET",
    status: "COMPLETED",
    summary: "Gamified AI Skill Platform",
    techStack: ["React", "Node.js", "MongoDB", "Framer Motion"],
    evidenceImages: ["/images/projects/skillmorph-1.jpg"],
    
    // Investigation Module Fields
    problemStatement: "Users often abandon online courses due to lack of motivation and engaging progression systems.",
    solution: "Created a gamified learning platform where users level up an RPG-style avatar by completing coding challenges and tutorials.",
    architecture: "Microservices architecture with Node.js backend, React frontend, and a MongoDB cluster for user state and progression data.",
    features: [
      "RPG-style skill trees for learning paths",
      "Interactive code execution environment",
      "Daily quests and leaderboards",
      "Achievement system with rare badges"
    ],
    screenshots: [
      "/images/projects/skillmorph-1.jpg",
      "/images/projects/skillmorph-2.jpg"
    ],
    challenges: [
      "Designing an engaging yet balanced progression curve",
      "Safely executing user-submitted code in sandboxed environments",
      "Managing complex state for the skill tree UI"
    ],
    futureImprovements: [
      "Multiplayer coding battles",
      "More diverse learning paths (e.g., Design, Marketing)",
      "Community-created quests"
    ],
    techBadges: ["React", "Node.js", "Docker", "MongoDB", "Redux"],
    timeline: "May 2024 - Aug 2024",
    links: {
      githubUrl: "https://github.com/mithras/skillmorph"
    }
  },
  {
    id: "proj-003",
    caseNumber: "CASE #003",
    title: "ChatSpace",
    classification: "CONFIDENTIAL",
    status: "IN PROGRESS",
    summary: "Real-Time Collaboration Platform",
    techStack: ["Next.js", "Socket.io", "Redis", "Tailwind CSS"],
    evidenceImages: ["/images/projects/chatspace-1.jpg"],
    
    // Investigation Module Fields
    problemStatement: "Remote teams struggle with scattered communication across multiple disjointed tools.",
    solution: "A unified workspace combining real-time chat, collaborative whiteboarding, and task management in a single interface.",
    architecture: "Event-driven architecture with Socket.io for real-time updates, Redis for pub/sub messaging, and Next.js for the client application.",
    features: [
      "Real-time messaging with rich text support",
      "Collaborative multiplayer whiteboards",
      "Integrated Kanban boards",
      "End-to-end encryption for private channels"
    ],
    screenshots: [
      "/images/projects/chatspace-1.jpg"
    ],
    challenges: [
      "Handling state synchronization across multiple collaborative tools simultaneously",
      "Ensuring low-latency updates for the whiteboard feature",
      "Implementing robust offline-first capabilities"
    ],
    futureImprovements: [
      "Video and audio conferencing",
      "AI-powered meeting summaries",
      "Integration with GitHub and Jira"
    ],
    techBadges: ["Next.js", "Socket.io", "Redis", "WebRTC"],
    timeline: "Sep 2024 - Present",
    links: {
      githubUrl: "https://github.com/mithras/chatspace"
    }
  },
  {
    id: "proj-004",
    caseNumber: "CASE #004",
    title: "Portfolio Generator",
    classification: "UNCLASSIFIED",
    status: "COMPLETED",
    summary: "Professional Portfolio Builder",
    techStack: ["Vue.js", "Firebase", "Stripe", "GSAP"],
    evidenceImages: ["/images/projects/portfolio-gen-1.jpg"],
    
    // Investigation Module Fields
    problemStatement: "Developers spend too much time building portfolios from scratch rather than focusing on content and showcasing their work.",
    solution: "A SaaS tool that generates highly customizable, performant developer portfolios from simple markdown or JSON inputs.",
    architecture: "Serverless backend with Firebase Functions, Vue.js for a reactive frontend editor, and automated deployment pipelines.",
    features: [
      "Visual drag-and-drop editor",
      "Markdown and JSON import support",
      "Custom domain mapping",
      "Multiple cinematic theme templates"
    ],
    screenshots: [
      "/images/projects/portfolio-gen-1.jpg",
      "/images/projects/portfolio-gen-2.jpg"
    ],
    challenges: [
      "Creating a flexible rendering engine for various portfolio themes",
      "Managing custom domains and SSL certificates automatically",
      "Building a smooth, glitch-free visual editor"
    ],
    futureImprovements: [
      "More premium templates",
      "Analytics dashboard for portfolio views",
      "Automated SEO optimization suggestions"
    ],
    techBadges: ["Vue.js", "Firebase", "GSAP", "Tailwind CSS"],
    timeline: "Nov 2023 - Dec 2023",
    links: {
      liveUrl: "https://portfoliogen.io"
    }
  }
];
