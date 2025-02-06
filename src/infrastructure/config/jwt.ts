import jwt from "jsonwebtoken";
import { env } from "./env";

interface Payload {
  userId: string;
  email: string;
}

export function generateJwtToken(payload: Payload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}