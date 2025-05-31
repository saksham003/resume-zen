'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema } from '@/lib/validations';
import { ResumeFormData } from '@/lib/validations';

const defaultValues: ResumeFormData = {
  name: 'My Resume',
  roleTag: '',
  personalDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    website: '',
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  awards: [],
  customSections: [],
};

interface ResumeFormContextType {
  formData: ResumeFormData;
  updateFormData: (data: Partial<ResumeFormData>) => void;
  resetForm: () => void;
}

const ResumeFormContext = createContext<ResumeFormContextType | undefined>(
  undefined
);

interface ResumeFormProviderProps {
  children: ReactNode;
}

export function ResumeFormProvider({ children }: ResumeFormProviderProps) {
  const methods = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues,
    mode: 'onChange',
  });

  const formData = methods.watch();

  const updateFormData = (data: Partial<ResumeFormData>) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        methods.setValue(key as keyof ResumeFormData, value, {
          shouldValidate: true,
        });
      }
    });
  };

  const resetForm = () => {
    methods.reset(defaultValues);
  };

  const contextValue: ResumeFormContextType = {
    formData,
    updateFormData,
    resetForm,
  };

  return (
    <ResumeFormContext.Provider value={contextValue}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ResumeFormContext.Provider>
  );
}

export function useResumeForm() {
  const context = useContext(ResumeFormContext);
  if (context === undefined) {
    throw new Error('useResumeForm must be used within a ResumeFormProvider');
  }
  return context;
}
