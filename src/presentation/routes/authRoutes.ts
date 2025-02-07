import { Router } from "express";
import { LoginUserController } from "../../application/controller/LoginUserController";
import { LoginUserUseCase } from "../../application/usecases/login/LoginUserUseCase";
import { InMemoryUserRepository } from "../../infrastructure/database/InMemoryUserRepository";
import { BcryptEncrypterService } from "../../infrastructure/service/BcryptEncrypterService";

const authRoutes = Router();

const userRepository = new InMemoryUserRepository();
const encrypterService = new BcryptEncrypterService();
const loginUserUseCase = new LoginUserUseCase(userRepository, encrypterService);
const loginUserController = new LoginUserController(loginUserUseCase);

authRoutes.post("/login", (req, res) => loginUserController.handle(req, res));

export { authRoutes };