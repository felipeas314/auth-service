import bcrypt from "bcrypt";
import { IEncrypterService } from "../../domain/service/IEncrypterService";

export class BcryptEncrypterService implements IEncrypterService {
  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}