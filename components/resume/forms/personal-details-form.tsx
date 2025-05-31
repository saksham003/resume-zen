'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResumeFormData } from '@/lib/validations';

export function PersonalDetailsForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register('personalDetails.firstName')}
            placeholder="Enter your first name"
          />
          {errors.personalDetails?.firstName && (
            <p className="text-sm text-red-600">
              {errors.personalDetails.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...register('personalDetails.lastName')}
            placeholder="Enter your last name"
          />
          {errors.personalDetails?.lastName && (
            <p className="text-sm text-red-600">
              {errors.personalDetails.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...register('personalDetails.email')}
          placeholder="Enter your email address"
        />
        {errors.personalDetails?.email && (
          <p className="text-sm text-red-600">
            {errors.personalDetails.email.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            {...register('personalDetails.phone')}
            placeholder="Enter your phone number"
          />
          {errors.personalDetails?.phone && (
            <p className="text-sm text-red-600">
              {errors.personalDetails.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            {...register('personalDetails.location')}
            placeholder="City, State/Country"
          />
          {errors.personalDetails?.location && (
            <p className="text-sm text-red-600">
              {errors.personalDetails.location.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedIn">LinkedIn Profile</Label>
        <Input
          id="linkedIn"
          type="url"
          {...register('personalDetails.linkedIn')}
          placeholder="https://linkedin.com/in/yourprofile"
        />
        {errors.personalDetails?.linkedIn && (
          <p className="text-sm text-red-600">
            {errors.personalDetails.linkedIn.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Personal Website</Label>
        <Input
          id="website"
          type="url"
          {...register('personalDetails.website')}
          placeholder="https://yourwebsite.com"
        />
        {errors.personalDetails?.website && (
          <p className="text-sm text-red-600">
            {errors.personalDetails.website.message}
          </p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          Tips for Personal Details
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a professional email address</li>
          <li>
            • Include your full phone number with country code if applying
            internationally
          </li>
          <li>• Keep your location general (city and state/country)</li>
          <li>• Ensure your LinkedIn profile is up-to-date and professional</li>
        </ul>
      </div>
    </div>
  );
}
