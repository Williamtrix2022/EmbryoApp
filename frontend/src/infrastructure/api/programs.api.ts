import { CreateProgramInput, Program, ProgramStatus } from '../../domain/types/program.types';
import { httpGet, httpPatch, httpPost } from './http-client';

interface ProgramsResponse {
  data: Program[];
}

interface ProgramResponse {
  data: Program;
}

export async function fetchPrograms(status?: ProgramStatus): Promise<Program[]> {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const response = await httpGet<ProgramsResponse>(`/api/programs${query}`);
  return response.data;
}

export async function createProgramApi(input: CreateProgramInput): Promise<Program> {
  const response = await httpPost<ProgramResponse>('/api/programs', input);
  return response.data;
}

export async function updateProgramStatusApi(
  id: string,
  status: ProgramStatus,
): Promise<Program> {
  const response = await httpPatch<ProgramResponse>(`/api/programs/${id}/status`, { status });
  return response.data;
}
