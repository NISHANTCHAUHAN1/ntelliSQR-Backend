import mongoose from "mongoose";
const schema = new mongoose.Schema({
    message: { type: String, required: true },
    stack: String,
    meta: Object,
    route: String,
    level: { type: String, default: "error" },
    createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Log", schema);
