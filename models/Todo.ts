import mongoose, { Document } from "mongoose";

export interface ITodo extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date | null;
}

const schema = new mongoose.Schema<ITodo>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", schema);
