import mongoose from "mongoose";
export default async function connectDB() {
    const uri = process.env.MONGO_URI;
    if (!uri)
        throw new Error("MONGO_URI not set in env");
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}
