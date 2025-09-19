import httpStatus from 'http-status';
import { TComplaintAnalysisRequest, TComplaintSummary } from './ai.interface';
import AppError from '../../errors/AppError';
import { Complaint } from '../complaint/complaint.model';
import { TComplaintForAnalysis } from './ai.interface';
import { generateComplaintAnalysis } from './ai.gemini';

// Generate AI summary using Gemini
const generateAISummary = async (
  complaints: TComplaintForAnalysis[],
): Promise<{
  overview: string;
  majorConcerns: string[];
  recommendedActions: string[];
  urgentIssues: string[];
}> => {
  // Use Gemini AI for analysis
  return await generateComplaintAnalysis(complaints);
};

// Main service function
const analyzeComplaintsBatch = async (
  payload: TComplaintAnalysisRequest,
): Promise<TComplaintSummary> => {
  const { complaintIds, location } = payload;

  if (!complaintIds || complaintIds.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Complaint IDs are required');
  }

  // Fetch complaints from database
  const query: Record<string, string | { $in: string[] }> = {
    _id: { $in: complaintIds },
  };

  // Add location filters if provided
  if (location) {
    if (location.thana) {
      query.thana = location.thana;
    }
    if (location.district) {
      query.district = location.district;
    }
    if (location.division) {
      query.division = location.division;
    }
    if (location.postCode) {
      query.postCode = location.postCode;
    }
  }

  const complaints = await Complaint.find(query).select(
    'title description category priority department thana district division postCode status createdAt',
  );

  if (complaints.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No complaints found with the provided criteria',
    );
  }

  // Convert to analysis format
  const complaintsForAnalysis: TComplaintForAnalysis[] = complaints.map(
    (complaint) => ({
      _id: (complaint._id as string).toString(),
      title: complaint.title,
      description: complaint.description,
      category: complaint.category,
      priority: complaint.priority,
      department: complaint.department,
      thana: complaint.thana,
      district: complaint.district,
      division: complaint.division,
      postCode: complaint.postCode,
      status: complaint.status,
      createdAt: complaint.createdAt || new Date(),
    }),
  );

  // Calculate statistics
  const totalComplaints = complaintsForAnalysis.length;

  // Category distribution
  const categoryCount: { [key: string]: number } = {};
  complaintsForAnalysis.forEach((c) => {
    categoryCount[c.category] = (categoryCount[c.category] || 0) + 1;
  });

  const commonIssues = Object.entries(categoryCount)
    .map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / totalComplaints) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Priority distribution
  const priorityCount: { [key: string]: number } = {};
  complaintsForAnalysis.forEach((c) => {
    priorityCount[c.priority] = (priorityCount[c.priority] || 0) + 1;
  });

  const priorityDistribution = Object.entries(priorityCount)
    .map(([priority, count]) => ({
      priority,
      count,
      percentage: Math.round((count / totalComplaints) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Department distribution
  const deptCount: { [key: string]: number } = {};
  complaintsForAnalysis.forEach((c) => {
    deptCount[c.department] = (deptCount[c.department] || 0) + 1;
  });

  const departmentDistribution = Object.entries(deptCount)
    .map(([department, count]) => ({
      department,
      count,
      percentage: Math.round((count / totalComplaints) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Generate AI summary
  const aiSummary = await generateAISummary(complaintsForAnalysis);

  return {
    totalComplaints,
    location,
    commonIssues,
    priorityDistribution,
    departmentDistribution,
    aiSummary,
    analysisDate: new Date(),
  };
};

// Analyze complaints by location
const analyzeComplaintsByLocation = async (location: {
  thana?: string;
  district?: string;
  division?: string;
  postCode?: string;
}): Promise<TComplaintSummary> => {
  // Build query based on location
  const query: Record<string, string> = {};

  if (location.thana) {
    query.thana = location.thana;
  }
  if (location.district) {
    query.district = location.district;
  }
  if (location.division) {
    query.division = location.division;
  }
  if (location.postCode) {
    query.postCode = location.postCode;
  }

  // Get all complaint IDs for this location
  const complaints = await Complaint.find(query).select('_id');
  const complaintIds = complaints.map((c) => (c._id as string).toString());

  if (complaintIds.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No complaints found for the specified location',
    );
  }

  return analyzeComplaintsBatch({ complaintIds, location });
};

export const AIService = {
  analyzeComplaintsBatch,
  analyzeComplaintsByLocation,
};
