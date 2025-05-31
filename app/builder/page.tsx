'use client';

import { useState } from 'react';
import { ResumeFormProvider } from '@/components/resume/resume-form-provider';
import { ResumeFormPanel } from '@/components/resume/resume-form-panel';
import { ResumePreviewPanel } from '@/components/resume/resume-preview-panel';
import { BuilderHeader } from '@/components/resume/builder-header';

export default function ResumeBuilderPage() {
  const [activeSection, setActiveSection] = useState('personal-details');

  return (
    <ResumeFormProvider>
      <div className="min-h-screen bg-gray-50">
        <BuilderHeader />

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-100px)]">
            <div className="bg-white rounded-lg shadow-sm border overflow-y-auto ">
              <ResumeFormPanel
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-y-auto">
              <ResumePreviewPanel />
            </div>
          </div>
        </div>
      </div>
    </ResumeFormProvider>
  );
}
