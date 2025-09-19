import { Schema, model, Model, Document } from 'mongoose';
import { TComplaint } from './complaint.interface';
import {
  COMPLAINT_STATUS,
  COMPLAINT_PRIORITY,
  COMPLAINT_VISIBILITY,
  DEPARTMENTS,
} from './complaint.constant';

// Define the document interface
interface IComplaintDocument extends TComplaint, Document {}

// Define the model type
type ComplaintModel = Model<IComplaintDocument>;

const complaintSchema = new Schema<IComplaintDocument, ComplaintModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },

    // Location fields
    postCode: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    thana: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    division: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(COMPLAINT_STATUS),
      default: COMPLAINT_STATUS.PENDING,
    },
    priority: {
      type: String,
      enum: Object.values(COMPLAINT_PRIORITY),
      default: COMPLAINT_PRIORITY.MEDIUM,
    },
    visibility: {
      type: String,
      enum: Object.values(COMPLAINT_VISIBILITY),
      default: COMPLAINT_VISIBILITY.PUBLIC,
    },

    department: {
      type: String,
      required: true,
      enum: Object.values(DEPARTMENTS),
    },
    citizen: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedAdmin: { type: Schema.Types.ObjectId, ref: 'User' },

    isAnonymous: { type: Boolean, default: false },

    votes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

complaintSchema.pre<IComplaintDocument>('save', function (next) {
  if (this.isAnonymous) {
    this.visibility = COMPLAINT_VISIBILITY.PUBLIC;
    this.citizen = undefined;
  }
  next();
});

export const Complaint = model<IComplaintDocument, ComplaintModel>(
  'Complaint',
  complaintSchema,
);
