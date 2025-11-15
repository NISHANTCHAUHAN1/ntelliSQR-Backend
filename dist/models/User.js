import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, { timestamps: true });
schema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
schema.methods.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
};
export default mongoose.model("User", schema);
