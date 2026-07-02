import { Program, ProgramStatus } from '../../domain/entities/program.entity';
import { IProgramRepository } from '../../domain/repositories/i-program.repository';

export interface GetProgramsInput {
  organizationId: string;
  status?: ProgramStatus;
}

export type GetProgramsOutput = Program[];

export class GetProgramsUseCase {
  constructor(private readonly programRepository: IProgramRepository) {}

  async execute(input: GetProgramsInput): Promise<GetProgramsOutput> {
    return this.programRepository.findAll({
      organizationId: input.organizationId,
      status: input.status,
    });
  }
}
