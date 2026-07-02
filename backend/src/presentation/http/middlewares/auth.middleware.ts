import { NextFunction, Request, Response } from 'express';
import { TokenPayload } from '../../../application/services/i-auth.service';
import { ITokenBlacklist } from '../../../application/services/i-token-blacklist';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { AppError } from '../../../shared/errors/app-error';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

const jwtService = new JwtService();

export function createAuthMiddleware(blacklist: ITokenBlacklist) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      next(new AppError('Token de autenticación requerido', 401));
      return;
    }

    const token = authHeader.slice(7);

    if (blacklist.has(token)) {
      next(new AppError('Sesión cerrada. Inicia sesión nuevamente', 401));
      return;
    }

    try {
      req.user = jwtService.verifyToken(token);
      next();
    } catch (err) {
      next(err);
    }
  };
}
