import jwt from "jsonwebtoken";

export function signJwt(payload: object) {
  const secret = (process.env.JWT_SECRET || "change_this_secret") as jwt.Secret;

  const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

  return jwt.sign(payload, secret, { expiresIn });
}
