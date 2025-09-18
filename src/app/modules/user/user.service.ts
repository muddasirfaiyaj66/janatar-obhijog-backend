import { generateWelcomeEmailHTML } from '../../utils/emailTemplate';
import { sendEmail } from '../../utils/sendEmail';
import { TUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';

export const createUserIntoDB = async (
  payload: TUser,
): Promise<TUser | null> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userArr = await User.create([payload], { session });
    const user = userArr[0];
    await session.commitTransaction();

    const createUserHtml = generateWelcomeEmailHTML({
      name: user?.firstName as string,
    });
    await sendEmail(user.email, createUserHtml, 'Welcome to Janatar Obhijog');
    return user;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const updateUserIntoDB = async (
  userId: string,
  updateData: Partial<TUser>,
): Promise<TUser | null> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      session,
    });
    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
const deleteUserFromDB = async (userId: string): Promise<TUser | null> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllUserFromDB = async (): Promise<TUser[]> => {
  return User.find({ isDeleted: false });
};

const getSingleUserFromDB = async (userId: string): Promise<TUser | null> => {
  return User.findOne({ _id: userId, isDeleted: false });
};

export const UserService = {
  createUserIntoDB,
  updateUserIntoDB,
  deleteUserFromDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
