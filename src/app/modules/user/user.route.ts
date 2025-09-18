import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser,
);


router.get('/', auth(USER_ROLE.superAdmin), UserController.getAllUsers);


router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  UserController.getMyProfile,
);


router.patch(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  validateRequest(UserValidation.updateMyProfileValidationSchema),
  UserController.updateMyProfile,
);


router.get('/:id', auth(USER_ROLE.superAdmin), UserController.getSingleUser);


router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUser,
);


router.delete('/:id', auth(USER_ROLE.superAdmin), UserController.deleteUser);

export const UserRoutes = router;
