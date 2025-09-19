import httpStatus from 'http-status-codes';
import { AuthServices } from './auth.service';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import sendResponse from '../utils/sendResponse';
import AppError from '../errors/AppError';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      user: user,
      accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: null,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Refresh token is missing');
  }

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token refreshed successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email is required');
  }

  await AuthServices.forgetPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link sent to email successfully',
    data: null,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Authorization token is missing',
    );
  }

  const token = authHeader.split(' ')[1];

  await AuthServices.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: null,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
