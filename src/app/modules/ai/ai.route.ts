import { Router } from 'express';
import { AIController } from './ai.controller';
import { AIValidation } from './ai.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = Router();

// Analyze batch of complaints - requires admin or superAdmin role
router.post(
  '/analyze-batch',
  auth('admin', 'superAdmin'),
  validateRequest(AIValidation.analyzeComplaintsBatchSchema),
  AIController.analyzeComplaintsBatch,
);

// Analyze complaints by location - requires admin or superAdmin role
router.post(
  '/analyze-location',
  auth('admin', 'superAdmin'),
  validateRequest(AIValidation.analyzeComplaintsByLocationSchema),
  AIController.analyzeComplaintsByLocation,
);

export const AIRoutes = router;
