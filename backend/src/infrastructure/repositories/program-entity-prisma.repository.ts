import {
  ProgramEntity,
  ProgramEntityStatus,
  ProgramEntityType,
} from '../../domain/entities/program-entity.entity';
import {
  CreateEntityData,
  FindEntitiesFilter,
  IProgramEntityRepository,
} from '../../domain/repositories/i-program-entity.repository';
import { prisma } from '../database/prisma-client';

type PrismaEntity = {
  id: string;
  programId: string;
  entityType: string;
  name: string;
  externalReference: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export class ProgramEntityPrismaRepository implements IProgramEntityRepository {
  async findByProgram(filter: FindEntitiesFilter): Promise<ProgramEntity[]> {
    const records = await prisma.programEntity.findMany({
      where: {
        programId: filter.programId,
        ...(filter.entityType ? { entityType: filter.entityType } : {}),
      },
      orderBy: [{ entityType: 'asc' }, { createdAt: 'asc' }],
    });
    return records.map((r) => this.toEntity(r));
  }

  async create(data: CreateEntityData): Promise<ProgramEntity> {
    const record = await prisma.programEntity.create({
      data: {
        id: data.id,
        programId: data.programId,
        entityType: data.entityType,
        name: data.name,
        externalReference: data.externalReference,
        status: data.status,
      },
    });
    return this.toEntity(record);
  }

  private toEntity(record: PrismaEntity): ProgramEntity {
    return new ProgramEntity({
      id: record.id,
      programId: record.programId,
      entityType: record.entityType as ProgramEntityType,
      name: record.name,
      externalReference: record.externalReference,
      status: record.status as ProgramEntityStatus,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
