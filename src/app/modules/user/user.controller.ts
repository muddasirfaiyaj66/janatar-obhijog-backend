import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { USER_ROLE } from './user.constant';
import { TQuery } from '../../interface/query';

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req.body);

  // Set refresh token as httpOnly cookie
  res.cookie('refreshToken', result.refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  // Remove password from user object before sending response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = result.user;

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: {
      user: userWithoutPassword,
      accessToken: result.accessToken,
    },
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUserFromDB(req.query as TQuery);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result.data,
    meta: result.pagination,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getSingleUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await UserService.getSingleUserFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your profile fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateUserIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const userRole = req.user?.role;

  if (userRole !== USER_ROLE.superAdmin) {
    if (req.body.role !== undefined) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not authorized to change role!',
      );
    }

    if (req.body.department !== undefined) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not authorized to change department!',
      );
    }

    if (req.body.designation !== undefined) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not authorized to change designation!',
      );
    }

    if (req.body.isDeleted !== undefined) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not authorized to change deletion status!',
      );
    }

    if (req.body.isBanned !== undefined) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not authorized to change ban status!',
      );
    }
  }

  const result = await UserService.updateUserIntoDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your profile updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getMyProfile,
  updateUser,
  updateMyProfile,
  deleteUser,
};
