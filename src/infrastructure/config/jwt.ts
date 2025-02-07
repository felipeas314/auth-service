import jwt from "jsonwebtoken";
import { env } from "./env";

interface Payload {
  userId: string;
  email: string;
}

export function generateJwtToken(payload: Payload): string {
  return jwt.sign(payload, 'env.JWT_SECRET', {
    expiresIn: '240000', // Certifique-se que é uma string
    algorithm: "HS256", // Algoritmo obrigatório na versão 9+
  });
}
