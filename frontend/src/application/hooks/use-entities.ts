import { useCallback, useState } from 'react';
import { AddEntityInput, Entity } from '../../domain/types/entity.types';
import { createEntityApi, fetchEntities } from '../../infrastructure/api/entities.api';

interface UseEntitiesReturn {
  entities: Entity[];
  isLoading: boolean;
  error: string | null;
  getEntities: () => Promise<void>;
  addEntity: (input: AddEntityInput) => Promise<boolean>;
  clearError: () => void;
}

export function useEntities(programId: string): UseEntitiesReturn {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEntities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchEntities(programId);
      setEntities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar entidades');
    } finally {
      setIsLoading(false);
    }
  }, [programId]);

  const addEntity = useCallback(
    async (input: AddEntityInput): Promise<boolean> => {
      setError(null);
      try {
        const entity = await createEntityApi(programId, input);
        setEntities((prev) => [...prev, entity]);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al registrar entidad');
        return false;
      }
    },
    [programId],
  );

  const clearError = useCallback(() => setError(null), []);

  return { entities, isLoading, error, getEntities, addEntity, clearError };
}
