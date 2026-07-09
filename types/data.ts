export type ClassificationLevel = 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';

export interface Project {
  id: string;
  caseNumber: string;
  title: string;
  classification: ClassificationLevel;
  status: 'COMPLETED' | 'IN PROGRESS';
  summary: string;
  techStack: string[];
  evidenceImages: string[];
  
  // New Investigation Module fields
  problemStatement: string;
  solution: string;
  architecture: string;
  features: string[];
  screenshots: string[];
  demoVideo?: string;
  challenges: string[];
  futureImprovements: string[];
  techBadges: string[];
  timeline: string;
  
  links: {
    liveUrl?: string;
    githubUrl?: string;
  };
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ExperienceRecord {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  classification: ClassificationLevel;
}

export interface EducationRecord {
  id: string;
  degree: string;
  institution: string;
  year: string;
  details: string[];
}

export interface CertificateRecord {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface DossierProfile {
  name: string;
  alias: string;
  role: string;
  status: string;
  currentLocation: string;
  bio: string[];
}

export interface GlobalSettings {
  investigationMode: boolean;
  theme: 'dark' | 'light';
  soundEnabled: boolean;
}
