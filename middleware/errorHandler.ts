import { Request, Response, NextFunction } from "express";
import { logErrorToDb } from "../utils/logger";

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    console.error("Error:", err?.message || err);
    await logErrorToDb(err, req.originalUrl, {
      body: req.body,
      user: (req as any).user?._id,
    });
  } catch (e) {
    console.error("Failed to log error:", e);
  }

  const status = err?.status || 500;
  const message = err?.message || "Internal Server Error";
  res.status(status).json({ message });
};
