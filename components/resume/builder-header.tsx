"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeForm } from "./resume-form-provider";
import { Save, Download, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BuilderHeader() {
  const { formData, updateFormData } = useResumeForm();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ name: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving resume...", formData);
  };

  const handleDownload = () => {
    console.log("Downloading PDF...");
  };

  const handlePreview = () => {
    console.log("Opening preview...");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>

          <div className="h-6 w-px bg-gray-300" />

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              Resume Name:
            </span>
            <Input
              value={formData.name}
              onChange={handleNameChange}
              className="w-48"
              placeholder="Enter resume name"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>

          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <Button size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </header>
  );
}
