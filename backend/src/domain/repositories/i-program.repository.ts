import { Program, ProgramProps, ProgramStatus } from '../entities/program.entity';

export interface FindProgramsFilter {
  organizationId: string;
  status?: ProgramStatus;
}

export type CreateProgramData = Omit<ProgramProps, 'createdAt' | 'updatedAt'>;

export interface IProgramRepository {
  findById(id: string, organizationId: string): Promise<Program | null>;
  findAll(filter: FindProgramsFilter): Promise<Program[]>;
  create(data: CreateProgramData): Promise<Program>;
  updateStatus(id: string, status: ProgramStatus): Promise<Program>;
  codeExists(code: string, organizationId: string): Promise<boolean>;
}
