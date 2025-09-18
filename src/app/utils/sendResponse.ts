import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  token?: string;
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
};
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response: {
    success: boolean;
    message?: string;
    data: T;
    meta: Record<string, unknown>;
    token?: string;
  } = {
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta || {},
  };

  if (data.token) {
    response.token = data.token;
  }

  res.status(data?.statusCode).json(response);
};

export default sendResponse;
