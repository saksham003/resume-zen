'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ResumeFormData } from '@/lib/validations';
import {
  Plus,
  Trash2,
  GripVertical,
  Award,
  FileCheck,
  ExternalLink,
} from 'lucide-react';

export function CertificationsAwardsForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({
    control,
    name: 'certifications',
  });

  const {
    fields: awardFields,
    append: appendAward,
    remove: removeAward,
  } = useFieldArray({
    control,
    name: 'awards',
  });

  const addCertification = () => {
    appendCert({
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
    });
  };

  const addAward = () => {
    appendAward({
      id: crypto.randomUUID(),
      title: '',
      issuer: '',
      date: '',
      description: '',
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Certifications
          </h3>
        </div>

        {certFields.length === 0 && (
          <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
            <FileCheck className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-3">No certifications added yet</p>
            <Button onClick={addCertification} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
        )}

        {certFields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <h4 className="font-medium text-gray-900">
                  Certification {index + 1}
                </h4>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeCert(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-name-${index}`}>
                  Certification Name *
                </Label>
                <Input
                  id={`cert-name-${index}`}
                  {...register(`certifications.${index}.name`)}
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
                {errors.certifications?.[index]?.name && (
                  <p className="text-sm text-red-600">
                    {errors.certifications[index]?.name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`cert-issuer-${index}`}>
                  Issuing Organization *
                </Label>
                <Input
                  id={`cert-issuer-${index}`}
                  {...register(`certifications.${index}.issuer`)}
                  placeholder="e.g., Amazon Web Services"
                />
                {errors.certifications?.[index]?.issuer && (
                  <p className="text-sm text-red-600">
                    {errors.certifications[index]?.issuer?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-issue-date-${index}`}>Issue Date *</Label>
                <Input
                  id={`cert-issue-date-${index}`}
                  type="month"
                  {...register(`certifications.${index}.issueDate`)}
                />
                {errors.certifications?.[index]?.issueDate && (
                  <p className="text-sm text-red-600">
                    {errors.certifications[index]?.issueDate?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`cert-expiry-date-${index}`}>
                  Expiry Date (Optional)
                </Label>
                <Input
                  id={`cert-expiry-date-${index}`}
                  type="month"
                  {...register(`certifications.${index}.expiryDate`)}
                  placeholder="Leave blank if no expiry"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-credential-id-${index}`}>
                  Credential ID (Optional)
                </Label>
                <Input
                  id={`cert-credential-id-${index}`}
                  {...register(`certifications.${index}.credentialId`)}
                  placeholder="e.g., ABC123XYZ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`cert-credential-url-${index}`}>
                  Credential URL (Optional)
                </Label>
                <div className="relative">
                  <Input
                    id={`cert-credential-url-${index}`}
                    type="url"
                    {...register(`certifications.${index}.credentialUrl`)}
                    placeholder="https://verify.example.com/credential"
                    className="pl-8"
                  />
                  <ExternalLink className="h-4 w-4 text-gray-400 absolute left-2 top-3" />
                </div>
                {errors.certifications?.[index]?.credentialUrl && (
                  <p className="text-sm text-red-600">
                    {errors.certifications[index]?.credentialUrl?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {certFields.length > 0 && (
          <Button
            onClick={addCertification}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Certification
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Awards & Achievements
          </h3>
        </div>

        {awardFields.length === 0 && (
          <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
            <Award className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-3">No awards added yet</p>
            <Button onClick={addAward} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Award
            </Button>
          </div>
        )}

        {awardFields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <h4 className="font-medium text-gray-900">Award {index + 1}</h4>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeAward(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`award-title-${index}`}>Award Title *</Label>
                <Input
                  id={`award-title-${index}`}
                  {...register(`awards.${index}.title`)}
                  placeholder="e.g., Employee of the Year"
                />
                {errors.awards?.[index]?.title && (
                  <p className="text-sm text-red-600">
                    {errors.awards[index]?.title?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`award-issuer-${index}`}>
                  Issuing Organization *
                </Label>
                <Input
                  id={`award-issuer-${index}`}
                  {...register(`awards.${index}.issuer`)}
                  placeholder="e.g., Company Name, University"
                />
                {errors.awards?.[index]?.issuer && (
                  <p className="text-sm text-red-600">
                    {errors.awards[index]?.issuer?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`award-date-${index}`}>Date Received *</Label>
              <Input
                id={`award-date-${index}`}
                type="month"
                {...register(`awards.${index}.date`)}
                className="md:w-1/2"
              />
              {errors.awards?.[index]?.date && (
                <p className="text-sm text-red-600">
                  {errors.awards[index]?.date?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`award-description-${index}`}>
                Description (Optional)
              </Label>
              <Textarea
                id={`award-description-${index}`}
                {...register(`awards.${index}.description`)}
                placeholder="Brief description of the award and why you received it..."
                className="min-h-[80px]"
              />
            </div>
          </div>
        ))}

        {awardFields.length > 0 && (
          <Button onClick={addAward} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Award
          </Button>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          Tips for Certifications & Awards
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • <strong>Certifications:</strong> Include industry-relevant
            certifications and professional licenses
          </li>
          <li>
            • <strong>Awards:</strong> Highlight recognition for work
            performance, academic achievements, or community service
          </li>
          <li>
            • List items in reverse chronological order (most recent first)
          </li>
          <li>
            • Include credential IDs and verification links when available
          </li>
          <li>
            • Focus on achievements that demonstrate skills relevant to your
            target role
          </li>
        </ul>
      </div>
    </div>
  );
}
