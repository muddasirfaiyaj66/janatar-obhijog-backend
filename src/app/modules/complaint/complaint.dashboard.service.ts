import { Complaint } from './complaint.model';
import { Types } from 'mongoose';

// Citizen dashboard
const getCitizenDashboard = async (userId: string) => {
  const stats = await Complaint.aggregate([
    { $match: { citizen: new Types.ObjectId(userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const recent = await Complaint.find({ citizen: userId })
    .populate('department', 'name')
    .sort({ createdAt: -1 })
    .limit(10);

  return { stats, recent };
};

// Admin dashboard
const getAdminDashboard = async (departmentId: string) => {
  const stats = await Complaint.aggregate([
    { $match: { department: new Types.ObjectId(departmentId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const priority = await Complaint.aggregate([
    { $match: { department: new Types.ObjectId(departmentId) } },
    { $group: { _id: '$priority', count: { $sum: 1 } } },
  ]);

  const recent = await Complaint.find({ department: departmentId })
    .populate('citizen', 'firstName lastName')
    .sort({ createdAt: -1 })
    .limit(10);

  return { stats, priority, recent };
};

// SuperAdmin dashboard
const getSuperAdminDashboard = async () => {
  const stats = await Complaint.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const departmentWise = await Complaint.aggregate([
    { $group: { _id: '$department', count: { $sum: 1 } } },
    {
      $lookup: {
        from: 'departments',
        localField: '_id',
        foreignField: '_id',
        as: 'department',
      },
    },
    { $unwind: { path: '$department', preserveNullAndEmptyArrays: true } },
    { $project: { _id: 1, count: 1, departmentName: '$department.name' } },
  ]);

  const priority = await Complaint.aggregate([
    { $group: { _id: '$priority', count: { $sum: 1 } } },
  ]);

  return { stats, departmentWise, priority };
};

export const ComplaintDashboardService = {
  getCitizenDashboard,
  getAdminDashboard,
  getSuperAdminDashboard,
};
