import { Request, Response } from "express";
import { ICreateUserUseCase } from "../usecases/user/ICreateUserUseCase";

export class CreateUserController {
    constructor(private createUserUseCase: ICreateUserUseCase) {}
  
    public async handle(req: Request, res: Response) {
      try {
        const { name, email, password } = req.body;
        const result = await this.createUserUseCase.execute({ name, email, password });
  
        return res.status(201).json(result);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }
  }