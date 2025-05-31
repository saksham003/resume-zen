'use client';

import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ResumeFormData } from '@/lib/validations';
import { useState } from 'react';

export function SummaryForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ResumeFormData>();
  const summaryValue = watch('summary') || '';
  const [charCount, setCharCount] = useState(summaryValue.length);

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          {...register('summary')}
          onChange={handleSummaryChange}
          placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives. This should be 2-4 sentences that capture your professional identity."
          className="min-h-[120px] resize-none"
          maxLength={500}
        />
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">{charCount}/500 characters</span>
          <span
            className={`${charCount < 50 ? 'text-orange-600' : 'text-green-600'}`}
          >
            {charCount < 50 ? 'Add more detail' : 'Good length'}
          </span>
        </div>
        {errors.summary && (
          <p className="text-sm text-red-600">{errors.summary.message}</p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          Tips for Writing a Strong Summary
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Start with your professional title or area of expertise</li>
          <li>• Mention years of experience and key industries</li>
          <li>• Highlight 2-3 of your most relevant skills or achievements</li>
          <li>• Include what you&apos;re looking for in your next role</li>
          <li>• Keep it concise but impactful (50-200 words)</li>
          <li>• Use action words and quantify achievements when possible</li>
        </ul>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Example Summary</h4>
        <p className="text-sm text-gray-700 italic">
          &ldquo;Results-driven Software Engineer with 5+ years of experience
          developing scalable web applications using React, Node.js, and cloud
          technologies. Proven track record of leading cross-functional teams
          and delivering projects that increased user engagement by 40%.
          Passionate about creating efficient, user-centric solutions and
          seeking opportunities to drive innovation in a fast-paced tech
          environment.&rdquo;
        </p>
      </div>
    </div>
  );
}
