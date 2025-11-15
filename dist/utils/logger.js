import Log from "../models/Log.js";
export async function logErrorToDb(err, route, meta) {
    try {
        const payload = {
            message: err?.message || String(err),
            stack: err?.stack,
            route,
            meta,
            level: "error"
        };
        await Log.create(payload);
    }
    catch (e) {
        // if logging to DB fails, print to console but don't crash
        console.error("Failed to write log to DB:", e);
    }
}
