import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { LogoutUseCase } from '../../../application/use-cases/logout.use-case';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          error: {
            message: 'Datos de entrada inválidos',
            details: parsed.error.errors.map((e) => e.message),
          },
        });
        return;
      }

      const result = await this.loginUseCase.execute(parsed.data);
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization!.slice(7);
      this.logoutUseCase.execute(token);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
