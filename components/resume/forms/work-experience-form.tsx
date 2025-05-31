'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ResumeFormData } from '@/lib/validations';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export function WorkExperienceForm() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperience',
  });

  const addWorkExperience = () => {
    append({
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      description: '',
      achievements: [''],
    });
  };

  const addAchievement = (index: number) => {
    const currentAchievements =
      watch(`workExperience.${index}.achievements`) || [];
    setValue(`workExperience.${index}.achievements`, [
      ...currentAchievements,
      '',
    ]);
  };

  const removeAchievement = (workIndex: number, achievementIndex: number) => {
    const currentAchievements =
      watch(`workExperience.${workIndex}.achievements`) || [];
    const updatedAchievements = currentAchievements.filter(
      (_, i) => i !== achievementIndex
    );
    setValue(`workExperience.${workIndex}.achievements`, updatedAchievements);
  };

  return (
    <div className="space-y-6">
      {fields.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <Button onClick={addWorkExperience} className="mx-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Job
          </Button>
        </div>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-200 rounded-lg p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <h3 className="font-medium text-gray-900">
                Work Experience {index + 1}
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`company-${index}`}>Company Name *</Label>
              <Input
                id={`company-${index}`}
                {...register(`workExperience.${index}.company`)}
                placeholder="Enter company name"
              />
              {errors.workExperience?.[index]?.company && (
                <p className="text-sm text-red-600">
                  {errors.workExperience[index]?.company?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Job Title *</Label>
              <Input
                id={`position-${index}`}
                {...register(`workExperience.${index}.position`)}
                placeholder="Enter job title"
              />
              {errors.workExperience?.[index]?.position && (
                <p className="text-sm text-red-600">
                  {errors.workExperience[index]?.position?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>Start Date *</Label>
              <Input
                id={`startDate-${index}`}
                type="month"
                {...register(`workExperience.${index}.startDate`)}
              />
              {errors.workExperience?.[index]?.startDate && (
                <p className="text-sm text-red-600">
                  {errors.workExperience[index]?.startDate?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`}>End Date</Label>
              <Input
                id={`endDate-${index}`}
                type="month"
                {...register(`workExperience.${index}.endDate`)}
                disabled={watch(`workExperience.${index}.isCurrentRole`)}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`currentRole-${index}`}
                  {...register(`workExperience.${index}.isCurrentRole`)}
                />
                <Label htmlFor={`currentRole-${index}`} className="text-sm">
                  I currently work here
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>Job Description *</Label>
            <Textarea
              id={`description-${index}`}
              {...register(`workExperience.${index}.description`)}
              placeholder="Describe your role, responsibilities, and key contributions..."
              className="min-h-[100px]"
            />
            {errors.workExperience?.[index]?.description && (
              <p className="text-sm text-red-600">
                {errors.workExperience[index]?.description?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Key Achievements</Label>
            <div className="space-y-2">
              {(watch(`workExperience.${index}.achievements`) || ['']).map(
                (_, achievementIndex) => (
                  <div key={achievementIndex} className="flex gap-2">
                    <Input
                      {...register(
                        `workExperience.${index}.achievements.${achievementIndex}`
                      )}
                      placeholder="Describe a specific achievement or accomplishment..."
                    />
                    {achievementIndex > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          removeAchievement(index, achievementIndex)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addAchievement(index)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
            </div>
          </div>
        </div>
      ))}

      {fields.length > 0 && (
        <Button
          onClick={addWorkExperience}
          variant="outline"
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Job
        </Button>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          Tips for Work Experience
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Start with your most recent position</li>
          <li>• Use action verbs to describe your responsibilities</li>
          <li>
            • Quantify achievements with numbers, percentages, or dollar amounts
          </li>
          <li>• Focus on accomplishments rather than just duties</li>
          <li>
            • Tailor your descriptions to match the job you&apos;re applying for
          </li>
        </ul>
      </div>
    </div>
  );
}
