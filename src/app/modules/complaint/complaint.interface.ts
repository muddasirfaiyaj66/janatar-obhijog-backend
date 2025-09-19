import { Types } from 'mongoose';
import {
  COMPLAINT_STATUS,
  COMPLAINT_PRIORITY,
  COMPLAINT_VISIBILITY,
} from './complaint.constant';

export interface TComplaint {
  title: string;
  description: string;
  category: string;

  status: (typeof COMPLAINT_STATUS)[keyof typeof COMPLAINT_STATUS];
  priority: (typeof COMPLAINT_PRIORITY)[keyof typeof COMPLAINT_PRIORITY];
  visibility: (typeof COMPLAINT_VISIBILITY)[keyof typeof COMPLAINT_VISIBILITY];

  department: Types.ObjectId;
  citizen?: Types.ObjectId;
  assignedAdmin?: Types.ObjectId;

  isAnonymous?: boolean;

  votes?: Types.ObjectId[];
  comments?: {
    user: Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];

  createdAt?: Date;
  updatedAt?: Date;
}
