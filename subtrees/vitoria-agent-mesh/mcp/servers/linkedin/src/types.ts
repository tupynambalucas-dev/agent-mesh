export interface ResumeMetadata {
  filename: string;
  path: string;
  format: 'markdown' | 'text' | 'pdf' | 'docx' | 'unknown';
  sizeBytes: number;
  lastModified: string;
  isText: boolean;
  previewExcerpt?: string;
}

export interface CandidateProfile {
  name: string;
  headline: string;
  summary: string;
  location: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationYear?: number;
  }>;
}

export interface JobPostingSummary {
  jobId: string;
  title: string;
  company: string;
  location: string;
  workplaceType: 'remote' | 'hybrid' | 'on-site';
  postedDate: string;
  easyApply: boolean;
  snippet?: string;
}

export interface JobDetails extends JobPostingSummary {
  description: string;
  requiredSkills: string[];
  hiringTeam?: {
    name?: string;
    title?: string;
    profileId?: string;
  };
  applicantCount?: number;
}

export interface EasyApplyFormStep {
  stepIndex: number;
  stepTitle: string;
  fields: Array<{
    fieldId: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'radio' | 'file_upload' | 'checkbox';
    required: boolean;
    currentValue?: string;
    options?: string[];
  }>;
}
