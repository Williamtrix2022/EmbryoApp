import { ProgramEntity, ProgramEntityType } from '../../domain/entities/program-entity.entity';
import { IProgramEntityRepository } from '../../domain/repositories/i-program-entity.repository';
import { IProgramRepository } from '../../domain/repositories/i-program.repository';
import { AppError } from '../../shared/errors/app-error';

export interface GetEntitiesInput {
  programId: string;
  organizationId: string;
  entityType?: ProgramEntityType;
}

export type GetEntitiesOutput = ProgramEntity[];

export class GetEntitiesByProgramUseCase {
  constructor(
    private readonly programRepository: IProgramRepository,
    private readonly entityRepository: IProgramEntityRepository,
  ) {}

  async execute(input: GetEntitiesInput): Promise<GetEntitiesOutput> {
    const program = await this.programRepository.findById(
      input.programId,
      input.organizationId,
    );
    if (!program) {
      throw new AppError('Programa no encontrado', 404);
    }

    return this.entityRepository.findByProgram({
      programId: input.programId,
      entityType: input.entityType,
    });
  }
}
