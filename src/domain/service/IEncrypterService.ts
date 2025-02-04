export interface IEncrypterService {
    compare(plain: string, hash: string): Promise<boolean>
}