import { useCallback, useState } from 'react';
import {
  CreateProgramInput,
  Program,
  ProgramStatus,
} from '../../domain/types/program.types';
import {
  createProgramApi,
  fetchPrograms,
  updateProgramStatusApi,
} from '../../infrastructure/api/programs.api';

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPrograms = useCallback(async (status?: ProgramStatus): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPrograms(status);
      setPrograms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los programas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProgram = useCallback(
    async (input: CreateProgramInput): Promise<boolean> => {
      setError(null);
      try {
        const created = await createProgramApi(input);
        setPrograms((prev) => [created, ...prev]);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al crear el programa');
        return false;
      }
    },
    [],
  );

  const updateStatus = useCallback(
    async (id: string, status: ProgramStatus): Promise<void> => {
      setError(null);
      try {
        const updated = await updateProgramStatusApi(id, status);
        setPrograms((prev) => prev.map((p) => (p.id === id ? updated : p)));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar el estado');
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return { programs, isLoading, error, getPrograms, createProgram, updateStatus, clearError };
}
