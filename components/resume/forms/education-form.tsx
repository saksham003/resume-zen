'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResumeFormData } from '@/lib/validations';
import { Plus, Trash2, GripVertical, GraduationCap } from 'lucide-react';

const degreeTypes = [
  'High School Diploma',
  'Associate Degree',
  "Bachelor's Degree",
  "Master's Degree",
  'Doctorate (PhD)',
  'Professional Degree',
  'Certificate',
  'Diploma',
];

export function EducationForm() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const addEducation = () => {
    append({
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: '',
    });
  };

  return (
    <div className="space-y-6">
      {fields.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No education added yet</p>
          <Button onClick={addEducation} className="mx-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
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
                Education {index + 1}
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

          <div className="space-y-2">
            <Label htmlFor={`institution-${index}`}>Institution *</Label>
            <Input
              id={`institution-${index}`}
              {...register(`education.${index}.institution`)}
              placeholder="Enter school/university name"
            />
            {errors.education?.[index]?.institution && (
              <p className="text-sm text-red-600">
                {errors.education[index]?.institution?.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree Type *</Label>
              <Select
                value={watch(`education.${index}.degree`) || ''}
                onValueChange={(value) =>
                  setValue(`education.${index}.degree`, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select degree type" />
                </SelectTrigger>
                <SelectContent>
                  {degreeTypes.map((degree) => (
                    <SelectItem key={degree} value={degree}>
                      {degree}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.education?.[index]?.degree && (
                <p className="text-sm text-red-600">
                  {errors.education[index]?.degree?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study *</Label>
              <Input
                id={`fieldOfStudy-${index}`}
                {...register(`education.${index}.fieldOfStudy`)}
                placeholder="e.g., Computer Science, Business, etc."
              />
              {errors.education?.[index]?.fieldOfStudy && (
                <p className="text-sm text-red-600">
                  {errors.education[index]?.fieldOfStudy?.message}
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
                {...register(`education.${index}.startDate`)}
              />
              {errors.education?.[index]?.startDate && (
                <p className="text-sm text-red-600">
                  {errors.education[index]?.startDate?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`}>End Date</Label>
              <Input
                id={`endDate-${index}`}
                type="month"
                {...register(`education.${index}.endDate`)}
                placeholder="Leave blank if current"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
              <Input
                id={`gpa-${index}`}
                {...register(`education.${index}.gpa`)}
                placeholder="e.g., 3.8/4.0 or 3.8"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`honors-${index}`}>
                Honors/Awards (Optional)
              </Label>
              <Input
                id={`honors-${index}`}
                {...register(`education.${index}.honors`)}
                placeholder="e.g., Summa Cum Laude, Dean's List"
              />
            </div>
          </div>
        </div>
      ))}

      {fields.length > 0 && (
        <Button onClick={addEducation} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Education
        </Button>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          Tips for Education Section
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • List education in reverse chronological order (most recent first)
          </li>
          <li>• Include your GPA if it&apos;s 3.5 or higher</li>
          <li>
            • Add relevant coursework, projects, or honors if you&apos;re a
            recent graduate
          </li>
          <li>• For older professionals, focus on highest degree achieved</li>
          <li>• Include certifications and professional development courses</li>
        </ul>
      </div>
    </div>
  );
}
