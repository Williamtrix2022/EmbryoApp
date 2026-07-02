import { Program, ProgramStatus } from '../../domain/entities/program.entity';
import { IProgramRepository } from '../../domain/repositories/i-program.repository';
import { AppError } from '../../shared/errors/app-error';

export interface UpdateProgramStatusInput {
  programId: string;
  organizationId: string;
  newStatus: ProgramStatus;
}

export type UpdateProgramStatusOutput = Program;

export class UpdateProgramStatusUseCase {
  constructor(private readonly programRepository: IProgramRepository) {}

  async execute(input: UpdateProgramStatusInput): Promise<UpdateProgramStatusOutput> {
    const program = await this.programRepository.findById(
      input.programId,
      input.organizationId,
    );

    if (!program) {
      throw new AppError('Programa no encontrado', 404);
    }

    // Regla de negocio: la entidad valida si la transición es permitida
    program.assertCanTransitionTo(input.newStatus);

    return this.programRepository.updateStatus(input.programId, input.newStatus);
  }
}
