'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResumeFormData } from '@/lib/validations';
import { Plus, Trash2, Code, Users, Globe } from 'lucide-react';

export function SkillsForm() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const addSkill = (category: 'technical' | 'soft' | 'language') => {
    append({
      id: crypto.randomUUID(),
      name: '',
      category,
      level: undefined,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <Code className="h-4 w-4" />;
      case 'soft':
        return <Users className="h-4 w-4" />;
      case 'language':
        return <Globe className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'technical':
        return 'Technical Skills';
      case 'soft':
        return 'Soft Skills';
      case 'language':
        return 'Languages';
      default:
        return category;
    }
  };

  const renderSkillCategory = (category: 'technical' | 'soft' | 'language') => {
    const categoryFields = fields.filter(
      (_, index) => watch(`skills.${index}.category`) === category
    );

    return (
      <div key={category} className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {getCategoryIcon(category)}
            <h3 className="font-medium text-gray-900">
              {getCategoryTitle(category)}
            </h3>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addSkill(category)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add{' '}
            {category === 'technical'
              ? 'Skill'
              : category === 'soft'
                ? 'Skill'
                : 'Language'}
          </Button>
        </div>

        {categoryFields.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No {category} skills added yet
          </p>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => {
              if (watch(`skills.${index}.category`) !== category) return null;

              return (
                <div key={field.id} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Input
                      {...register(`skills.${index}.name`)}
                      placeholder={`Enter ${category} skill`}
                    />
                    {errors.skills?.[index]?.name && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.skills[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  <div className="w-32">
                    <Select
                      value={watch(`skills.${index}.level`) || ''}
                      onValueChange={(value) =>
                        setValue(
                          `skills.${index}.level`,
                          value as
                            | 'beginner'
                            | 'intermediate'
                            | 'advanced'
                            | 'expert'
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {fields.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No skills added yet</p>
          <div className="flex justify-center gap-2">
            <Button onClick={() => addSkill('technical')} variant="outline">
              <Code className="h-4 w-4 mr-2" />
              Add Technical Skill
            </Button>
            <Button onClick={() => addSkill('soft')} variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Add Soft Skill
            </Button>
            <Button onClick={() => addSkill('language')} variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>
        </div>
      )}

      {fields.length > 0 && (
        <div className="space-y-4">
          {renderSkillCategory('technical')}
          {renderSkillCategory('soft')}
          {renderSkillCategory('language')}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          Tips for Skills Section
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • <strong>Technical Skills:</strong> Programming languages,
            frameworks, tools, software
          </li>
          <li>
            • <strong>Soft Skills:</strong> Communication, leadership,
            problem-solving, teamwork
          </li>
          <li>
            • <strong>Languages:</strong> Spoken languages with proficiency
            levels
          </li>
          <li>
            • Be honest about your skill levels - employers may test these
          </li>
          <li>
            • Focus on skills relevant to the job you&apos;re applying for
          </li>
        </ul>
      </div>
    </div>
  );
}
