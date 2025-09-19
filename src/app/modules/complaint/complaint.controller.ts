import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ComplaintService } from './complaint.service';
import { ComplaintDashboardService } from './complaint.dashboard.service';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { TQuery } from '../../interface/query';

const createComplaint = catchAsync(async (req, res) => {
  const result = await ComplaintService.createComplaintIntoDB({
    ...req.body,
    citizen: req.user?._id,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Complaint submitted successfully',
    data: result,
  });
});

const getComplaints = catchAsync(async (req, res) => {
  const result = await ComplaintService.getComplaintsFromDB(
    req.user as JwtPayload & { role: string; _id: string },
    req.query as TQuery,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Complaints retrieved successfully',
    data: result.data,
    meta: result.pagination,
  });
});

const resolveComplaint = catchAsync(async (req, res) => {
  const result = await ComplaintService.resolveComplaint(
    req.params.id,
    req.user as JwtPayload & { role: string; _id: string },
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Complaint resolved successfully',
    data: result,
  });
});

const voteComplaint = catchAsync(async (req, res) => {
  const result = await ComplaintService.voteComplaint(
    req.params.id,
    req.user._id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vote added successfully',
    data: result,
  });
});

const commentComplaint = catchAsync(async (req, res) => {
  const result = await ComplaintService.commentComplaint(
    req.params.id,
    req.user._id,
    req.body.text,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data: result,
  });
});

// dashboard controllers
const getCitizenDashboard = catchAsync(async (req, res) => {
  const result = await ComplaintDashboardService.getCitizenDashboard(
    req.user._id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Citizen dashboard data',
    data: result,
  });
});

const getAdminDashboard = catchAsync(async (req, res) => {
  const result = await ComplaintDashboardService.getAdminDashboard(
    req.user.department,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin dashboard data',
    data: result,
  });
});

const getSuperAdminDashboard = catchAsync(async (req, res) => {
  const result = await ComplaintDashboardService.getSuperAdminDashboard();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmin dashboard data',
    data: result,
  });
});

const getPublicComplaints = catchAsync(async (req, res) => {
  const result = await ComplaintService.getPublicComplaintsFromDB(
    req.query as TQuery,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Public complaints retrieved successfully',
    data: result.data,
    meta: result.pagination,
  });
});

export const ComplaintController = {
  createComplaint,
  getComplaints,
  getPublicComplaints,
  resolveComplaint,
  voteComplaint,
  commentComplaint,
  getCitizenDashboard,
  getAdminDashboard,
  getSuperAdminDashboard,
};
