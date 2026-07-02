import { ITokenBlacklist } from '../services/i-token-blacklist';

export class LogoutUseCase {
  constructor(private readonly tokenBlacklist: ITokenBlacklist) {}

  execute(token: string): void {
    this.tokenBlacklist.add(token);
  }
}
