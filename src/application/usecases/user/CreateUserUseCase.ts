import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IEncrypterService } from "../../../domain/service/IEncrypterService";
import { CreateUserRequestDTO } from "../../dto/CreateUserRequestDTO";
import { ICreateUserUseCase } from "./ICreateUserUseCase";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypterService: IEncrypterService
  ) {}

  public async execute(data: CreateUserRequestDTO): Promise<{ id: string; email: string }> {
    const {name, email, password} = data

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error("E-mail já está em uso.");
    }

    if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/.test(password)) {
        throw new Error("A senha deve conter pelo menos 6 caracteres, incluindo letras e números.");
    }

    const hashedPassword = await this.encrypterService.hash(password);

    const newUser = new User(Date.now().toString(), email, hashedPassword, name);
    await this.userRepository.save(newUser);

    return { id: newUser.id, email: newUser.email };
  }
}
