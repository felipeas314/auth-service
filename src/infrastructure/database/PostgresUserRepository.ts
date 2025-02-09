import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { db } from "../config/database";

export class PostgresUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!user) {
      return null;
    }

    return new User(user.id.toString(), user.email, user.password, user.name);
  }

  async save(user: User): Promise<void> {
    await db.none(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [user.name, user.email, user.password]
    );
  }
}
