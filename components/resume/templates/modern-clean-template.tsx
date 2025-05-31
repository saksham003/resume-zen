'use client';

import { ResumeFormData } from '@/lib/validations';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ModernCleanTemplateProps {
  data: ResumeFormData;
}

export function ModernCleanTemplate({ data }: ModernCleanTemplateProps) {
  const {
    personalDetails,
    summary,
    workExperience,
    education,
    skills,
    projects,
    certifications,
    awards,
  } = data;

  return (
    <div className="w-full min-h-[11in] p-8 text-gray-900 bg-white print:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalDetails.firstName} {personalDetails.lastName}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalDetails.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{personalDetails.email}</span>
            </div>
          )}
          {personalDetails.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{personalDetails.phone}</span>
            </div>
          )}
          {personalDetails.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{personalDetails.location}</span>
            </div>
          )}
          {personalDetails.linkedIn && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <a
                href={personalDetails.linkedIn}
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          )}
          {personalDetails.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <a
                href={personalDetails.website}
                className="text-blue-600 hover:underline"
              >
                Website
              </a>
            </div>
          )}
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {job.position}
                    </h3>
                    <p className="text-gray-700">{job.company}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {job.startDate} -{' '}
                    {job.isCurrentRole ? 'Present' : job.endDate}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{job.description}</p>
                {job.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {job.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                  {edu.honors && (
                    <p className="text-sm text-gray-600">{edu.honors}</p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['technical', 'soft', 'language'].map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category
              );
              if (categorySkills.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="font-medium text-gray-900 mb-2 capitalize">
                    {category === 'technical'
                      ? 'Technical Skills'
                      : category === 'soft'
                        ? 'Soft Skills'
                        : 'Languages'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  {(project.startDate || project.endDate) && (
                    <div className="text-sm text-gray-600">
                      {project.startDate} - {project.endDate || 'Present'}
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 text-sm">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      className="text-blue-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="text-blue-600 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-700">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-sm text-gray-600">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {cert.issueDate} {cert.expiryDate && `- ${cert.expiryDate}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {awards.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Awards & Achievements
          </h2>
          <div className="space-y-3">
            {awards.map((award, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{award.title}</h3>
                  <p className="text-gray-700">{award.issuer}</p>
                  {award.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {award.description}
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-600">{award.date}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
