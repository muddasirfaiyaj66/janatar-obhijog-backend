import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ComplaintValidation } from './complaint.validation';
import { ComplaintController } from './complaint.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Public route - no authentication required for public and anonymous complaints
router.get('/public', ComplaintController.getPublicComplaints);

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(ComplaintValidation.createComplaintValidationSchema),
  ComplaintController.createComplaint,
);

router.get(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin),
  ComplaintController.getComplaints,
);

router.put(
  '/:id/resolve',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(ComplaintValidation.resolveComplaintValidationSchema),
  ComplaintController.resolveComplaint,
);

// vote
router.post(
  '/:id/vote',
  auth(USER_ROLE.user),
  ComplaintController.voteComplaint,
);

// comment
router.post(
  '/:id/comment',
  auth(USER_ROLE.user),
  validateRequest(ComplaintValidation.commentValidationSchema),
  ComplaintController.commentComplaint,
);

// dashboards
router.get(
  '/dashboard/citizen',
  auth(USER_ROLE.user),
  ComplaintController.getCitizenDashboard,
);
router.get(
  '/dashboard/admin',
  auth(USER_ROLE.admin),
  ComplaintController.getAdminDashboard,
);
router.get(
  '/dashboard/super',
  auth(USER_ROLE.superAdmin),
  ComplaintController.getSuperAdminDashboard,
);

export const ComplaintRoutes = router;
