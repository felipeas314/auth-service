import pgPromise from "pg-promise";
import { env } from "./env";

const pgp = pgPromise({});

const db = pgp({
  host: env.DB_HOST || "localhost",
  port: Number(env.DB_PORT) || 5432,
  database: env.DB_NAME || "auth_service",
  user: env.DB_USER || "postgres",
  password: env.DB_PASSWORD || "postgres",
});

export { db, pgp };
