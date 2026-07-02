import { User, UserRole, UserStatus } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/i-user.repository';
import { prisma } from '../database/prisma-client';

export class UserPrismaRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { email } });
    if (!record) return null;
    return this.toEntity(record);
  }

  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id } });
    if (!record) return null;
    return this.toEntity(record);
  }

  private toEntity(record: {
    id: string;
    organizationId: string;
    fullName: string;
    email: string;
    passwordHash: string;
    role: string;
    status: string;
  }): User {
    return new User({
      id: record.id,
      organizationId: record.organizationId,
      fullName: record.fullName,
      email: record.email,
      passwordHash: record.passwordHash,
      role: record.role as UserRole,
      status: record.status as UserStatus,
    });
  }
}
