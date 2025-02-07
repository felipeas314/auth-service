// test/application/usecases/login/LoginUserUseCase.spec.ts
import { LoginUserUseCase } from "../../../../src/application/usecases/login/LoginUserUseCase";
import { IUserRepository } from "../../../../src/domain/repositories/IUserRepository";
import { IEncrypterService } from "../../../../src/domain/service/IEncrypterService";
import { User } from "../../../../src/domain/entities/User";

describe("LoginUserUseCase", () => {
  let userRepository: IUserRepository;
  let encrypterService: IEncrypterService;
  let loginUserUseCase: LoginUserUseCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    };

    encrypterService = {
      compare: jest.fn(),
    };

    loginUserUseCase = new LoginUserUseCase(userRepository, encrypterService);
  });

  it("Deve retornar um token ao login com credenciais válidas", async () => {
    // Arrange
    const mockUser = new User("1", "valid@teste.com", "hashedPassword");
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (encrypterService.compare as jest.Mock).mockResolvedValue(true);

    // Act
    const result = await loginUserUseCase.execute({
      email: "valid@teste.com",
      password: "123456",
    });

    // Assert
    expect(result).toHaveProperty("token");
    expect(userRepository.findByEmail).toBeCalledWith("valid@teste.com");
    expect(encrypterService.compare).toBeCalledWith("123456", "hashedPassword");
  });

  it("Deve lançar erro se usuário não existir", async () => {
    // Arrange
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    // Act & Assert
    await expect(
      loginUserUseCase.execute({ email: "invalid@teste.com", password: "123456" })
    ).rejects.toThrow("Credenciais inválidas (usuário não encontrado).");
  });

  it("Deve lançar erro se a senha estiver incorreta", async () => {
    // Arrange
    const mockUser = new User("1", "valid@teste.com", "hashedPassword");
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (encrypterService.compare as jest.Mock).mockResolvedValue(false);

    // Act & Assert
    await expect(
      loginUserUseCase.execute({ email: "valid@teste.com", password: "wrongPassword" })
    ).rejects.toThrow("Credenciais inválidas (senha incorreta).");
  });
});
