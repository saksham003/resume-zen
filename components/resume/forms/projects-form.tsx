'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ResumeFormData } from '@/lib/validations';
import {
  Plus,
  Trash2,
  GripVertical,
  FolderOpen,
  X,
  ExternalLink,
  Github,
} from 'lucide-react';
import { useState } from 'react';

export function ProjectsForm() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const [techInputs, setTechInputs] = useState<{ [key: number]: string }>({});

  const addProject = () => {
    append({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      projectUrl: '',
      githubUrl: '',
    });
  };

  const addTechnology = (projectIndex: number) => {
    const techInput = techInputs[projectIndex];
    if (!techInput?.trim()) return;

    const currentTechnologies =
      watch(`projects.${projectIndex}.technologies`) || [];
    if (!currentTechnologies.includes(techInput.trim())) {
      setValue(`projects.${projectIndex}.technologies`, [
        ...currentTechnologies,
        techInput.trim(),
      ]);
    }

    setTechInputs((prev) => ({ ...prev, [projectIndex]: '' }));
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const currentTechnologies =
      watch(`projects.${projectIndex}.technologies`) || [];
    const updatedTechnologies = currentTechnologies.filter(
      (_, i) => i !== techIndex
    );
    setValue(`projects.${projectIndex}.technologies`, updatedTechnologies);
  };

  const handleTechInputChange = (projectIndex: number, value: string) => {
    setTechInputs((prev) => ({ ...prev, [projectIndex]: value }));
  };

  const handleTechInputKeyPress = (
    e: React.KeyboardEvent,
    projectIndex: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology(projectIndex);
    }
  };

  return (
    <div className="space-y-6">
      {fields.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <Button onClick={addProject} className="mx-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Project
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
              <h3 className="font-medium text-gray-900">Project {index + 1}</h3>
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
            <Label htmlFor={`title-${index}`}>Project Title *</Label>
            <Input
              id={`title-${index}`}
              {...register(`projects.${index}.title`)}
              placeholder="Enter project name"
            />
            {errors.projects?.[index]?.title && (
              <p className="text-sm text-red-600">
                {errors.projects[index]?.title?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>
              Project Description *
            </Label>
            <Textarea
              id={`description-${index}`}
              {...register(`projects.${index}.description`)}
              placeholder="Describe what the project does, your role, and key features..."
              className="min-h-[100px]"
            />
            {errors.projects?.[index]?.description && (
              <p className="text-sm text-red-600">
                {errors.projects[index]?.description?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                value={techInputs[index] || ''}
                onChange={(e) => handleTechInputChange(index, e.target.value)}
                onKeyPress={(e) => handleTechInputKeyPress(e, index)}
                placeholder="Enter technology (e.g., React, Node.js)"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addTechnology(index)}
                disabled={!techInputs[index]?.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {watch(`projects.${index}.technologies`)?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {watch(`projects.${index}.technologies`).map(
                  (tech: string, techIndex: number) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index, techIndex)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>Start Date</Label>
              <Input
                id={`startDate-${index}`}
                type="month"
                {...register(`projects.${index}.startDate`)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`}>End Date</Label>
              <Input
                id={`endDate-${index}`}
                type="month"
                {...register(`projects.${index}.endDate`)}
                placeholder="Leave blank if ongoing"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`projectUrl-${index}`}>Live Demo URL</Label>
              <div className="relative">
                <Input
                  id={`projectUrl-${index}`}
                  type="url"
                  {...register(`projects.${index}.projectUrl`)}
                  placeholder="https://yourproject.com"
                  className="pl-8"
                />
                <ExternalLink className="h-4 w-4 text-gray-400 absolute left-2 top-3" />
              </div>
              {errors.projects?.[index]?.projectUrl && (
                <p className="text-sm text-red-600">
                  {errors.projects[index]?.projectUrl?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`githubUrl-${index}`}>GitHub Repository</Label>
              <div className="relative">
                <Input
                  id={`githubUrl-${index}`}
                  type="url"
                  {...register(`projects.${index}.githubUrl`)}
                  placeholder="https://github.com/username/repo"
                  className="pl-8"
                />
                <Github className="h-4 w-4 text-gray-400 absolute left-2 top-3" />
              </div>
              {errors.projects?.[index]?.githubUrl && (
                <p className="text-sm text-red-600">
                  {errors.projects[index]?.githubUrl?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {fields.length > 0 && (
        <Button onClick={addProject} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Project
        </Button>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          Tips for Projects Section
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • Showcase projects that demonstrate skills relevant to your target
            job
          </li>
          <li>• Include both personal and professional projects</li>
          <li>• Describe the problem solved and your specific contributions</li>
          <li>
            • Mention quantifiable results (users, performance improvements,
            etc.)
          </li>
          <li>• Provide links to live demos and source code when possible</li>
          <li>
            • List technologies in order of importance or prominence in the
            project
          </li>
        </ul>
      </div>
    </div>
  );
}
