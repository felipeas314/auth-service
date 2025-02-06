// src/infrastructure/config/env.ts

// Em uma aplicação real, você usaria dotenv ou outra lib para gerenciar as variáveis de ambiente
export const env = {
  JWT_SECRET: process.env.JWT_SECRET || "minha_senha_secreta_de_desenvolvimento",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
};
