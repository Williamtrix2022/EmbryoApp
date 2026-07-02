import { randomUUID } from 'crypto';
import {
  ProgramEntity,
  ProgramEntityType,
} from '../../domain/entities/program-entity.entity';
import {
  CreateEntityData,
  IProgramEntityRepository,
} from '../../domain/repositories/i-program-entity.repository';
import { IProgramRepository } from '../../domain/repositories/i-program.repository';
import { AppError } from '../../shared/errors/app-error';

export interface CreateEntityInput {
  programId: string;
  organizationId: string;
  entityType: ProgramEntityType;
  name: string;
  externalReference?: string;
}

export type CreateEntityOutput = ProgramEntity;

export class CreateEntityUseCase {
  constructor(
    private readonly programRepository: IProgramRepository,
    private readonly entityRepository: IProgramEntityRepository,
  ) {}

  async execute(input: CreateEntityInput): Promise<CreateEntityOutput> {
    // Verificar que el programa existe y pertenece a la organización
    const program = await this.programRepository.findById(
      input.programId,
      input.organizationId,
    );
    if (!program) {
      throw new AppError('Programa no encontrado', 404);
    }

    if (!program.isActive()) {
      throw new AppError(
        'No se pueden registrar entidades en un programa completado o cancelado',
        422,
      );
    }

    const data: CreateEntityData = {
      id: randomUUID(),
      programId: input.programId,
      entityType: input.entityType,
      name: input.name.trim(),
      externalReference: input.externalReference?.trim() ?? null,
      status: 'ACTIVA',
    };

    return this.entityRepository.create(data);
  }
}
