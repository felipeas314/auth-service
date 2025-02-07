import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    // Mock de usuários
    this.users = [
      new User("1", "user1@teste.com", "$2b$10$CypZzoBZEyqrqt6UBFQGp.9iwu3.nwg.poWnG.bAnsdHJu/WETmky"), // Senha "123456" (hashed)
      new User("2", "user2@teste.com", "$2b$10$CypZzoBZEyqrqt6UBFQGp.9iwu3.nwg.poWnG.bAnsdHJu/WETmky")  // Senha "senha123" (hashed)
    ];
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user ?? null;
  }
}