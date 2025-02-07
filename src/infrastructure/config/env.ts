export const env = {
  JWT_SECRET: process.env.JWT_SECRET || "minha_senha_super_secreta",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
};