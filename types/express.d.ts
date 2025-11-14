import { IUser } from "../models/User";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // we avoid circular type import; you can change to IUser if helpful
    }
  }
}
