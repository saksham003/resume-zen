'use client';

import { useResumeForm } from './resume-form-provider';
import { ModernCleanTemplate } from './templates/modern-clean-template';

export function ResumePreviewPanel() {
  const { formData } = useResumeForm();

  return (
    <div className="h-full flex flex-col">
      {/* <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
          <div className="text-sm text-gray-600">Modern & Clean Template</div>
        </div>
      </div> */}

      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div className="max-w-[8.5in] mx-auto bg-white shadow-lg">
          <ModernCleanTemplate data={formData} />
        </div>
      </div>
    </div>
  );
}
