import jwt from 'jsonwebtoken';
import { IAuthService, TokenPayload } from '../../application/services/i-auth.service';
import { AppError } from '../../shared/errors/app-error';
import { env } from '../config/env';

export class JwtService implements IAuthService {
  signToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, env.jwtSecret) as TokenPayload;
    } catch {
      throw new AppError('Token inválido o expirado', 401);
    }
  }
}
