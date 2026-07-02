import { Router } from 'express';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { LogoutUseCase } from '../../../application/use-cases/logout.use-case';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { InMemoryTokenBlacklist } from '../../../infrastructure/auth/token-blacklist';
import { UserPrismaRepository } from '../../../infrastructure/repositories/user-prisma.repository';
import { createAuthMiddleware } from '../middlewares/auth.middleware';
import { AuthController } from '../controllers/auth.controller';

const userRepository = new UserPrismaRepository();
const jwtService = new JwtService();

// Instancia compartida: la usan logout (para agregar) y el middleware (para verificar)
export const tokenBlacklist = new InMemoryTokenBlacklist();
export const requireAuth = createAuthMiddleware(tokenBlacklist);

const loginUseCase = new LoginUseCase(userRepository, jwtService);
const logoutUseCase = new LogoutUseCase(tokenBlacklist);
const controller = new AuthController(loginUseCase, logoutUseCase);

export const authRouter = Router();

authRouter.post('/auth/login', controller.login);
authRouter.post('/auth/logout', requireAuth, controller.logout);
