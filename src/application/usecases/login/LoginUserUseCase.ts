import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IEncrypterService } from "../../../domain/service/IEncrypterService";
import { generateJwtToken } from "../../../infrastructure/config/jwt";
import { LoginRequestDTO } from "../../dto/LoginRequestDTO";
import { ILoginUserUseCase } from "./ILoginUserUseCase";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypterService: IEncrypterService
  ) {}

  public async execute(data: LoginRequestDTO): Promise<{ token: string }> {
    const {email, password} = data;

    const user = await this.userRepository.findByEmail(email);
    if(!user) {
        throw new Error("Credenciais inválidas (usuário não encontrado).");
    } 

    const isPasswordValid = await this.encrypterService.compare(password, user.password)
    if(!isPasswordValid) {
        throw new Error("Credenciais inválidas (senha incorreta).");
    }

    const token = generateJwtToken({userId: user.id, email: user.email})

    return { token };
  }
}
