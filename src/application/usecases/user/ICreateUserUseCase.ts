// src/application/usecases/createUser/ICreateUserUseCase.ts
import { CreateUserRequestDTO } from "../../dto/CreateUserRequestDTO";

export interface ICreateUserUseCase {
  execute(data: CreateUserRequestDTO): Promise<{ id: string; email: string }>;
}
