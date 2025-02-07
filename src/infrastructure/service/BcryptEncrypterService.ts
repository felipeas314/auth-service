import bcrypt from "bcrypt";
import { IEncrypterService } from "../../domain/service/IEncrypterService";

export class BcryptEncrypterService implements IEncrypterService {

  private readonly saltRounds = 10;
  
  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }
}