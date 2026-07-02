import { AddEntityInput, Entity, EntityType } from '../../domain/types/entity.types';
import { httpGet, httpPost } from './http-client';

interface EntitiesResponse {
  data: Entity[];
}

interface EntityResponse {
  data: Entity;
}

export async function fetchEntities(
  programId: string,
  entityType?: EntityType,
): Promise<Entity[]> {
  const query = entityType ? `?entityType=${entityType}` : '';
  const res = await httpGet<EntitiesResponse>(`/programs/${programId}/entities${query}`);
  return res.data;
}

export async function createEntityApi(
  programId: string,
  input: AddEntityInput,
): Promise<Entity> {
  const res = await httpPost<EntityResponse>(`/programs/${programId}/entities`, input);
  return res.data;
}
