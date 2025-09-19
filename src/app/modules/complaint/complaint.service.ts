import { Complaint } from './complaint.model';
import { TComplaint } from './complaint.interface';
import { COMPLAINT_STATUS } from './complaint.constant';
import { sendEmail } from '../../utils/sendEmail';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { generateComplaintResolvedEmailHTML } from '../../utils/emailTemplate';
import QueryBuilder from '../../utils/QueryBuilder';
import { TQuery, TQueryResult } from '../../interface/query';

// create complaint
const createComplaintIntoDB = async (payload: TComplaint) => {
  return await Complaint.create(payload);
};

// get complaints by role with search, filter, and pagination
const getComplaintsFromDB = async (
  payload: JwtPayload & { role: string; _id: string },
  query: TQuery,
): Promise<TQueryResult<TComplaint>> => {
  let baseQuery;

  if (payload.role === 'superAdmin') {
    baseQuery = Complaint.find();
  } else if (payload.role === 'admin') {
    // Fetch user data to get department info
    const user = await User.findById(payload._id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    baseQuery = Complaint.find({ department: user.department });
  } else {
    baseQuery = Complaint.find({
      $or: [{ visibility: 'public' }, { citizen: payload._id }],
    });
  }

  // Apply search, filter, sort, and pagination
  const complaintQuery = new QueryBuilder(baseQuery, query)
    .search(['title', 'description', 'category'])
    .filter()
    .sort()
    .paginate()
    .fields();

  // Execute query with population
  const data = await complaintQuery.modelQuery.populate(
    'citizen',
    'firstName lastName email',
  );
  const pagination = await complaintQuery.getPaginationInfo();

  return {
    data,
    pagination,
  };
};

// resolve complaint
const resolveComplaint = async (
  complaintId: string,
  adminPayload: JwtPayload & { role: string; _id: string },
) => {
  const complaint = await Complaint.findById(complaintId).populate('citizen');

  if (!complaint) {
    throw new AppError(httpStatus.NOT_FOUND, 'Complaint not found');
  }

  // For non-superAdmin users, check department authorization
  if (adminPayload.role !== 'superAdmin') {
    const admin = await User.findById(adminPayload._id);
    if (!admin) {
      throw new AppError(httpStatus.NOT_FOUND, 'Admin user not found');
    }

    if (complaint.department.toString() !== admin.department?.toString()) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Not authorized to resolve this complaint',
      );
    }
  }

  complaint.status = COMPLAINT_STATUS.RESOLVED;
  await complaint.save();

  if (!complaint.isAnonymous && complaint.citizen) {
    const citizenData = complaint.citizen as {
      email?: string;
      firstName?: string;
      lastName?: string;
    };
    const { email } = citizenData;
    if (email) {
      const emailBody = generateComplaintResolvedEmailHTML({
        name:
          `${citizenData.firstName || ''} ${citizenData.lastName || ''}`.trim() ||
          'Citizen',
        complaintId: complaint._id?.toString() || '',
      });
      await sendEmail(email, emailBody, 'Your complaint has been resolved');
    }
  }

  return complaint;
};

// vote
const voteComplaint = async (complaintId: string, userId: string) => {
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new AppError(httpStatus.NOT_FOUND, 'Complaint not found');
  }

  return Complaint.findByIdAndUpdate(
    complaintId,
    { $addToSet: { votes: userId } },
    { new: true },
  );
};

// comment
const commentComplaint = async (
  complaintId: string,
  userId: string,
  text: string,
) => {
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new AppError(httpStatus.NOT_FOUND, 'Complaint not found');
  }

  if (!text || text.trim().length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment text is required');
  }

  return Complaint.findByIdAndUpdate(
    complaintId,
    {
      $push: {
        comments: { user: userId, text: text.trim(), createdAt: new Date() },
      },
    },
    { new: true },
  ).populate('comments.user', 'firstName lastName');
};

// get public and anonymous complaints with search, filter, and pagination
const getPublicComplaintsFromDB = async (
  query: TQuery,
): Promise<TQueryResult<TComplaint>> => {
  const baseQuery = Complaint.find({
    $or: [{ visibility: 'public' }, { isAnonymous: true }],
  });

  // Apply search, filter, sort, and pagination
  const complaintQuery = new QueryBuilder(baseQuery, query)
    .search(['title', 'description', 'category'])
    .filter()
    .sort()
    .paginate()
    .fields();

  // Execute query with population
  const data = await complaintQuery.modelQuery.populate(
    'citizen',
    'firstName lastName email',
  );
  const pagination = await complaintQuery.getPaginationInfo();

  return {
    data,
    pagination,
  };
};

export const ComplaintService = {
  createComplaintIntoDB,
  getComplaintsFromDB,
  getPublicComplaintsFromDB,
  resolveComplaint,
  voteComplaint,
  commentComplaint,
};
