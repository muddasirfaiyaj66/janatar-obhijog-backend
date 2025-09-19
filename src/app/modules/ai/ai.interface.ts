export interface TComplaintAnalysisRequest {
  complaintIds: string[];
  location?: {
    thana?: string;
    district?: string;
    division?: string;
    postCode?: string;
  };
}

export interface TComplaintSummary {
  totalComplaints: number;
  location?: {
    thana?: string;
    district?: string;
    division?: string;
    postCode?: string;
  };
  commonIssues: {
    category: string;
    count: number;
    percentage: number;
  }[];
  priorityDistribution: {
    priority: string;
    count: number;
    percentage: number;
  }[];
  departmentDistribution: {
    department: string;
    count: number;
    percentage: number;
  }[];
  aiSummary: {
    overview: string;
    majorConcerns: string[];
    recommendedActions: string[];
    urgentIssues: string[];
  };
  analysisDate: Date;
}

export interface TComplaintForAnalysis {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  department: string;
  thana: string;
  district: string;
  division: string;
  postCode: string;
  status: string;
  createdAt: Date;
}
