// Resume data structure types
export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  honors?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: "technical" | "soft" | "language";
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  projectUrl?: string;
  githubUrl?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Resume {
  id: string;
  name: string;
  roleTag?: string;
  lastEdited: string;
  personalDetails: PersonalDetails;
  summary?: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  customSections?: CustomSection[];
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

// Form state types
export type ResumeFormData = Omit<Resume, "id" | "lastEdited">;

// Template and UI types
export interface TemplateTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  themes: TemplateTheme[];
}

// Analysis types
export interface ResumeAnalysis {
  score: number;
  recommendations: string[];
  keywordGaps: string[];
  grammarSuggestions: string[];
  skillsAlignment: {
    matched: string[];
    missing: string[];
  };
}

// AI optimization types
export interface AIOptimizationRequest {
  fieldType: string;
  currentContent: string;
  context?: {
    targetRole?: string;
    industry?: string;
  };
}

export interface AIOptimizationResponse {
  optimizedContent: string;
  suggestions: string[];
}
