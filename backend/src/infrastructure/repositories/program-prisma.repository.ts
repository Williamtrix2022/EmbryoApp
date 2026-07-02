import { Program, ProgramStatus } from '../../domain/entities/program.entity';
import {
  CreateProgramData,
  FindProgramsFilter,
  IProgramRepository,
} from '../../domain/repositories/i-program.repository';
import { prisma } from '../database/prisma-client';

type PrismaProgram = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: string;
  startDate: Date;
  estimatedEndDate: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class ProgramPrismaRepository implements IProgramRepository {
  async findById(id: string, organizationId: string): Promise<Program | null> {
    const record = await prisma.program.findFirst({
      where: { id, organizationId },
    });
    return record ? this.toEntity(record) : null;
  }

  async findAll(filter: FindProgramsFilter): Promise<Program[]> {
    const records = await prisma.program.findMany({
      where: {
        organizationId: filter.organizationId,
        ...(filter.status ? { status: filter.status } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
    return records.map((r) => this.toEntity(r));
  }

  async create(data: CreateProgramData): Promise<Program> {
    const record = await prisma.program.create({
      data: {
        id: data.id,
        organizationId: data.organizationId,
        code: data.code,
        name: data.name,
        status: data.status,
        startDate: data.startDate,
        estimatedEndDate: data.estimatedEndDate,
        notes: data.notes,
      },
    });
    return this.toEntity(record);
  }

  async updateStatus(id: string, status: ProgramStatus): Promise<Program> {
    const record = await prisma.program.update({
      where: { id },
      data: { status },
    });
    return this.toEntity(record);
  }

  async codeExists(code: string, organizationId: string): Promise<boolean> {
    const count = await prisma.program.count({
      where: { code, organizationId },
    });
    return count > 0;
  }

  private toEntity(record: PrismaProgram): Program {
    return new Program({
      id: record.id,
      organizationId: record.organizationId,
      code: record.code,
      name: record.name,
      status: record.status as ProgramStatus,
      startDate: record.startDate,
      estimatedEndDate: record.estimatedEndDate,
      notes: record.notes,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
