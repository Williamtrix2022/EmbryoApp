import {
  ProgramEntity,
  ProgramEntityProps,
  ProgramEntityType,
} from '../entities/program-entity.entity';

export interface FindEntitiesFilter {
  programId: string;
  entityType?: ProgramEntityType;
}

export type CreateEntityData = Omit<ProgramEntityProps, 'createdAt' | 'updatedAt'>;

export interface IProgramEntityRepository {
  findByProgram(filter: FindEntitiesFilter): Promise<ProgramEntity[]>;
  create(data: CreateEntityData): Promise<ProgramEntity>;
}
