import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const validateRequest = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //validation

    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
