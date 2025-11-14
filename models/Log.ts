import mongoose, { Document } from "mongoose";

export interface ILog extends Document {
  message: string;
  stack?: string;
  meta?: any;
  route?: string;
  level?: string;
  createdAt: Date;
}

const schema = new mongoose.Schema<ILog>({
  message: { type: String, required: true },
  stack: String,
  meta: Object,
  route: String,
  level: { type: String, default: "error" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILog>("Log", schema);
