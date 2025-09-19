import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AIService } from './ai.service';
import httpStatus from 'http-status';

const analyzeComplaintsBatch = catchAsync(async (req, res) => {
  const result = await AIService.analyzeComplaintsBatch(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Complaints analyzed successfully',
    data: result,
  });
});

const analyzeComplaintsByLocation = catchAsync(async (req, res) => {
  const result = await AIService.analyzeComplaintsByLocation(req.body.location);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Location-based complaints analyzed successfully',
    data: result,
  });
});

export const AIController = {
  analyzeComplaintsBatch,
  analyzeComplaintsByLocation,
};
