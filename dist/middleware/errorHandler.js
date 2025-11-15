import { logErrorToDb } from "../utils/logger.js";
export const errorHandler = async (err, req, res, _next) => {
    try {
        console.error("Error:", err?.message || err);
        await logErrorToDb(err, req.originalUrl, {
            body: req.body,
            user: req.user?._id,
        });
    }
    catch (e) {
        console.error("Failed to log error:", e);
    }
    const status = err?.status || 500;
    const message = err?.message || "Internal Server Error";
    res.status(status).json({ message });
};
