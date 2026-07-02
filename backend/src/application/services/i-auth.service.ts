export interface TokenPayload {
  sub: string;   // userId
  orgId: string; // organizationId
  role: string;
}

export interface IAuthService {
  signToken(payload: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
}
