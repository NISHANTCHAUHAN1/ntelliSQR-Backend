import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        path: i.path,
        message: i.message,
      }));
      return res.status(400).json({ message: "Validation failed", issues });
    }

    next();
  };
