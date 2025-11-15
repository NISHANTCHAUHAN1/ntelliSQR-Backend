import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import User from "../models/User.js";
import { signJwt } from "../utils/generateToken.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });
    const token = signJwt({ id: user._id.toString() });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = signJwt({ id: user._id.toString() });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No user found with that email" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // RETURN RESET URL DIRECTLY IN RESPONSE (NO EMAIL)
    const resetUrl = `${process.env.CLIENT_URL}/reset/${token}`;

    res.json({
      message: "Reset URL generated (demo mode, no email)",
      resetUrl
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset link" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    const jwt = signJwt({ id: user._id.toString() });

    res.json({
      message: "Password reset successful",
      token: jwt,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};
