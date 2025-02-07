// test/application/usecases/createUser/CreateUserUseCase.spec.ts
import { CreateUserUseCase } from "../../../../src/application/usecases/user/CreateUserUseCase";
import { IUserRepository } from "../../../../src/domain/repositories/IUserRepository";
import { IEncrypterService } from "../../../../src/domain/service/IEncrypterService";
import { User } from "../../../../src/domain/entities/User";

describe("CreateUserUseCase", () => {
  let userRepository: IUserRepository;
  let encrypterService: IEncrypterService;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    encrypterService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(userRepository, encrypterService);
  });

  it("Deve criar um novo usuário com sucesso", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (encrypterService.hash as jest.Mock).mockResolvedValue("hashedPassword");

    const result = await createUserUseCase.execute({
      name: "John Doe",
      email: "john@example.com",
      password: "Pass123",
    });

    expect(result).toHaveProperty("id");
    expect(result.email).toBe("john@example.com");
    expect(userRepository.save).toBeCalled();
  });

  it("Deve retornar erro se o e-mail já estiver em uso", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(new User("1", "john@example.com", "hashedPassword", "John Doe"));

    await expect(
      createUserUseCase.execute({ name: "John Doe", email: "john@example.com", password: "Pass123" })
    ).rejects.toThrow("E-mail já está em uso.");
  });

  it("Deve retornar erro se a senha não for forte", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      createUserUseCase.execute({ name: "John Doe", email: "john@example.com", password: "123456" })
    ).rejects.toThrow("A senha deve conter pelo menos 6 caracteres, incluindo letras e números.");
  });
});
