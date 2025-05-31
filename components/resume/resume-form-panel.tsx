'use client';

import { Button } from '@/components/ui/button';
import { PersonalDetailsForm } from './forms/personal-details-form';
import { SummaryForm } from './forms/summary-form';
import { WorkExperienceForm } from './forms/work-experience-form';
import { EducationForm } from './forms/education-form';
import { SkillsForm } from './forms/skills-form';
import { ProjectsForm } from './forms/projects-form';
import { CertificationsAwardsForm } from './forms/certifications-awards-form';

interface ResumeFormPanelProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  {
    id: 'personal-details',
    label: 'Personal Details',
    component: PersonalDetailsForm,
  },
  {
    id: 'summary',
    label: 'Summary',
    component: SummaryForm,
  },
  {
    id: 'work-experience',
    label: 'Work Experience',
    component: WorkExperienceForm,
  },
  {
    id: 'education',
    label: 'Education',
    component: EducationForm,
  },
  {
    id: 'skills',
    label: 'Skills',
    component: SkillsForm,
  },
  {
    id: 'projects',
    label: 'Projects',
    component: ProjectsForm,
  },
  {
    id: 'certifications-awards',
    label: 'Certifications & Awards',
    component: CertificationsAwardsForm,
  },
];

export function ResumeFormPanel({
  activeSection,
  onSectionChange,
}: ResumeFormPanelProps) {
  const currentSection = sections.find(
    (section) => section.id === activeSection
  );
  const currentIndex = sections.findIndex(
    (section) => section.id === activeSection
  );

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      onSectionChange(sections[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onSectionChange(sections[currentIndex - 1].id);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSectionChange(section.id)}
              className="text-xs"
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentSection?.label}
          </h2>

          {currentSection && <currentSection.component />}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentIndex === sections.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
