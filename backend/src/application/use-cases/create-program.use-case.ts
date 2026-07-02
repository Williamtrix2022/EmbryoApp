import { randomUUID } from 'crypto';
import { Program, ProgramStatus } from '../../domain/entities/program.entity';
import { CreateProgramData, IProgramRepository } from '../../domain/repositories/i-program.repository';
import { AppError } from '../../shared/errors/app-error';

export interface CreateProgramInput {
  organizationId: string;
  name: string;
  code: string;
  startDate: string; // ISO 8601
  estimatedEndDate?: string;
  notes?: string;
}

export type CreateProgramOutput = Program;

export class CreateProgramUseCase {
  constructor(private readonly programRepository: IProgramRepository) {}

  async execute(input: CreateProgramInput): Promise<CreateProgramOutput> {
    const startDate = new Date(input.startDate);
    if (isNaN(startDate.getTime())) {
      throw new AppError('Fecha de inicio inválida', 422);
    }

    let estimatedEndDate: Date | null = null;
    if (input.estimatedEndDate) {
      estimatedEndDate = new Date(input.estimatedEndDate);
      if (isNaN(estimatedEndDate.getTime())) {
        throw new AppError('Fecha de fin estimada inválida', 422);
      }
      if (estimatedEndDate <= startDate) {
        throw new AppError('La fecha de fin debe ser posterior a la fecha de inicio', 422);
      }
    }

    const codeExists = await this.programRepository.codeExists(
      input.code,
      input.organizationId,
    );
    if (codeExists) {
      throw new AppError(`Ya existe un programa con el código "${input.code}"`, 409);
    }

    const data: CreateProgramData = {
      id: randomUUID(),
      organizationId: input.organizationId,
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      status: 'PLANIFICADO' as ProgramStatus,
      startDate,
      estimatedEndDate,
      notes: input.notes?.trim() ?? null,
    };

    const program = await this.programRepository.create(data);

    return program;
  }
}
