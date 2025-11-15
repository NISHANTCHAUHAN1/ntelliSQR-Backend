import mongoose from "mongoose";
const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
}, { timestamps: true });
export default mongoose.model("Todo", schema);
