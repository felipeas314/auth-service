export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public password: string,
    public name: string
  ) {}
}
