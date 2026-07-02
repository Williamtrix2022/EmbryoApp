export interface ITokenBlacklist {
  add(token: string): void;
  has(token: string): boolean;
}
