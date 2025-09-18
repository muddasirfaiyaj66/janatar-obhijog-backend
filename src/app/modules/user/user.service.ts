import { generateWelcomeEmailHTML } from '../../utils/emailTemplate';
import { sendEmail } from '../../utils/sendEmail';
import { TUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';
import { createToken } from '../../auth/auth.utils';
import config from '../../config';

export const createUserIntoDB = async (
  payload: TUser,
): Promise<{
  user: TUser;
  accessToken: string;
  refreshToken: string;
}> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userArr = await User.create([payload], { session });
    const user = userArr[0];
    await session.commitTransaction();

    // Generate JWT tokens for the newly created user
    const jwtPayload = {
      _id: user._id ? user._id.toString() : '',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    const createUserHtml = generateWelcomeEmailHTML({
      name: user?.firstName as string,
    });
    await sendEmail(user.email, createUserHtml, 'Welcome to Janatar Obhijog');

    // Convert Mongoose document to plain object to avoid circular reference
    const userObject = user.toObject();

    return {
      user: userObject,
      accessToken,
      refreshToken,
    };
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
    return user?.toObject() || null;
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
    return user?.toObject() || null;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllUserFromDB = async (): Promise<TUser[]> => {
  const users = await User.find({ isDeleted: false });
  return users.map((user) => user.toObject());
};

const getSingleUserFromDB = async (userId: string): Promise<TUser | null> => {
  const user = await User.findOne({ _id: userId, isDeleted: false });
  return user?.toObject() || null;
};

export const UserService = {
  createUserIntoDB,
  updateUserIntoDB,
  deleteUserFromDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
