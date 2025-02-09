// src/interfaces/routes/authRoutes.ts
import { Router } from "express";
import { CreateUserController } from "../../application/controller/CreateUserController";
import { CreateUserUseCase } from "../../application/usecases/user/CreateUserUseCase";
import { InMemoryUserRepository } from "../../infrastructure/database/InMemoryUserRepository";
import { BcryptEncrypterService } from "../../infrastructure/service/BcryptEncrypterService";
import { PostgresUserRepository } from "../../infrastructure/database/PostgresUserRepository";

const userRoutes = Router();

const usePostgres = process.env.USE_POSTGRES === "true";

const userRepository = usePostgres ? new PostgresUserRepository() : new InMemoryUserRepository();
const encrypterService = new BcryptEncrypterService();
const createUserUseCase = new CreateUserUseCase(userRepository, encrypterService);
const createUserController = new CreateUserController(createUserUseCase);

userRoutes.post("/register", (req, res) => createUserController.handle(req, res));

export { userRoutes };
