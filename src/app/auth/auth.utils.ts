import jwt, { Secret } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone: string;
  },
  secret: Secret,
  expiresIn: string | number,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  } as jwt.SignOptions);
};
