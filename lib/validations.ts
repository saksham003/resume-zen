import { z } from "zod";

// Personal Details Schema
export const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location must be less than 100 characters"),
  linkedIn: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
});

// Work Experience Schema
export const workExperienceSchema = z.object({
  id: z.string(),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be less than 100 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentRole: z.boolean(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  achievements: z.array(
    z.string().max(200, "Achievement must be less than 200 characters"),
  ),
});

// Education Schema
export const educationSchema = z.object({
  id: z.string(),
  institution: z
    .string()
    .min(1, "Institution is required")
    .max(100, "Institution must be less than 100 characters"),
  degree: z
    .string()
    .min(1, "Degree is required")
    .max(100, "Degree must be less than 100 characters"),
  fieldOfStudy: z
    .string()
    .min(1, "Field of study is required")
    .max(100, "Field of study must be less than 100 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  gpa: z.string().optional(),
  honors: z.string().optional(),
});

// Skills Schema
export const skillSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Skill name is required")
    .max(50, "Skill name must be less than 50 characters"),
  category: z.enum(["technical", "soft", "language"]),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
});

// Projects Schema
export const projectSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Project title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Project description is required")
    .max(500, "Project description must be less than 500 characters"),
  technologies: z.array(
    z.string().max(30, "Technology name must be less than 30 characters"),
  ),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  projectUrl: z
    .string()
    .url("Please enter a valid project URL")
    .optional()
    .or(z.literal("")),
  githubUrl: z
    .string()
    .url("Please enter a valid GitHub URL")
    .optional()
    .or(z.literal("")),
});

// Certifications Schema
export const certificationSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Certification name is required")
    .max(100, "Certification name must be less than 100 characters"),
  issuer: z
    .string()
    .min(1, "Issuer is required")
    .max(100, "Issuer must be less than 100 characters"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z
    .string()
    .url("Please enter a valid credential URL")
    .optional()
    .or(z.literal("")),
});

// Awards Schema
export const awardSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Award title is required")
    .max(100, "Award title must be less than 100 characters"),
  issuer: z
    .string()
    .min(1, "Issuer is required")
    .max(100, "Issuer must be less than 100 characters"),
  date: z.string().min(1, "Date is required"),
  description: z
    .string()
    .max(300, "Description must be less than 300 characters")
    .optional(),
});

// Custom Section Schema
export const customSectionSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Section title is required")
    .max(50, "Section title must be less than 50 characters"),
  content: z
    .string()
    .min(1, "Section content is required")
    .max(1000, "Section content must be less than 1000 characters"),
  order: z.number(),
});

// Complete Resume Schema
export const resumeSchema = z.object({
  name: z
    .string()
    .min(1, "Resume name is required")
    .max(100, "Resume name must be less than 100 characters"),
  roleTag: z
    .string()
    .max(50, "Role tag must be less than 50 characters")
    .optional(),
  personalDetails: personalDetailsSchema,
  summary: z
    .string()
    .max(500, "Summary must be less than 500 characters")
    .optional(),
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  awards: z.array(awardSchema),
  customSections: z.array(customSectionSchema).optional(),
});

// Form validation schemas for individual sections
export const personalDetailsFormSchema = personalDetailsSchema;
export const workExperienceFormSchema = workExperienceSchema.omit({ id: true });
export const educationFormSchema = educationSchema.omit({ id: true });
export const skillFormSchema = skillSchema.omit({ id: true });
export const projectFormSchema = projectSchema.omit({ id: true });
export const certificationFormSchema = certificationSchema.omit({ id: true });
export const awardFormSchema = awardSchema.omit({ id: true });
export const customSectionFormSchema = customSectionSchema.omit({ id: true });

// Summary/Objective Schema
export const summarySchema = z.object({
  summary: z
    .string()
    .min(50, "Summary should be at least 50 characters")
    .max(500, "Summary must be less than 500 characters")
    .optional(),
});

// Export types inferred from schemas
export type PersonalDetailsFormData = z.infer<typeof personalDetailsFormSchema>;
export type WorkExperienceFormData = z.infer<typeof workExperienceFormSchema>;
export type EducationFormData = z.infer<typeof educationFormSchema>;
export type SkillFormData = z.infer<typeof skillFormSchema>;
export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type CertificationFormData = z.infer<typeof certificationFormSchema>;
export type AwardFormData = z.infer<typeof awardFormSchema>;
export type CustomSectionFormData = z.infer<typeof customSectionFormSchema>;
export type SummaryFormData = z.infer<typeof summarySchema>;
export type ResumeFormData = z.infer<typeof resumeSchema>;
