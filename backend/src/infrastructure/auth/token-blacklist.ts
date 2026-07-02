import { ITokenBlacklist } from '../../application/services/i-token-blacklist';

// MVP: lista en memoria. Se pierde al reiniciar el servidor.
// Para producción: reemplazar con implementación en Redis.
export class InMemoryTokenBlacklist implements ITokenBlacklist {
  private readonly tokens = new Set<string>();

  add(token: string): void {
    this.tokens.add(token);
  }

  has(token: string): boolean {
    return this.tokens.has(token);
  }
}
