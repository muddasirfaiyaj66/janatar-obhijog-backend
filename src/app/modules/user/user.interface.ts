import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  designation?: string;
  department?: string;
  postCode: string;
  thana: string;
  district: string;
  division: string;
  address: string;
  role: 'admin' | 'superAdmin' | 'user';
  isDeleted: boolean;
  isBanned?: boolean;
  profileImg?: string;
  passwordChangedAt?: Date;
}
export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
