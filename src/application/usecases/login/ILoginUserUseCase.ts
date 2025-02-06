import { LoginRequestDTO } from "../../dto/LoginRequestDTO";

export interface ILoginUserUseCase {
  execute(data: LoginRequestDTO): Promise<{ token: string }>;
}
