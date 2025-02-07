import { Request, Response } from 'express'
import { ILoginUserUseCase } from '../usecases/login/ILoginUserUseCase'

export class LoginUserController {
    constructor(private loginUserUseCase: ILoginUserUseCase) {}

    public async handle(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            console.log('ok')
            const result = await this.loginUserUseCase.execute({email, password});
            return res.status(200).json(result);
        } catch(error: any) {
            return res.status(401).json({ message: error.message });
        }
    }
}