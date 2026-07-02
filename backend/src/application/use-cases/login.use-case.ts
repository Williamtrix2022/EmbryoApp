import bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/repositories/i-user.repository';
import { AppError } from '../../shared/errors/app-error';
import { IAuthService } from '../services/i-auth.service';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
}

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    if (!user.isActive()) {
      throw new AppError('Usuario inactivo. Contacte al administrador', 403);
    }

    const passwordValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!passwordValid) {
      // Mismo mensaje que "usuario no encontrado" para no revelar qué existe
      throw new AppError('Credenciales inválidas', 401);
    }

    const token = this.authService.signToken({
      sub: user.id,
      orgId: user.organizationId,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }
}
