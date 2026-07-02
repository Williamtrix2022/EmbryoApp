export type EntityType = 'DONANTE' | 'RECEPTORA' | 'PACIENTE' | 'EMBRION';
export type EntityStatus = 'ACTIVA' | 'INACTIVA';

export interface Entity {
  id: string;
  programId: string;
  entityType: EntityType;
  name: string;
  externalReference: string | null;
  status: EntityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AddEntityInput {
  entityType: EntityType;
  name: string;
  externalReference?: string;
}

export const ENTITY_TYPES: EntityType[] = ['DONANTE', 'RECEPTORA', 'PACIENTE', 'EMBRION'];

export const ENTITY_TYPE_LABELS: Record<EntityType, string> = {
  DONANTE: 'Donante',
  RECEPTORA: 'Receptora',
  PACIENTE: 'Paciente',
  EMBRION: 'Embrión',
};

export const ENTITY_TYPE_PLURAL: Record<EntityType, string> = {
  DONANTE: 'Donantes',
  RECEPTORA: 'Receptoras',
  PACIENTE: 'Pacientes',
  EMBRION: 'Embriones',
};

export const ENTITY_TYPE_BADGE: Record<EntityType, string> = {
  DONANTE: 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200',
  RECEPTORA: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
  PACIENTE: 'bg-sky-100 text-sky-700 ring-1 ring-sky-200',
  EMBRION: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
};

export const ENTITY_TYPE_AVATAR: Record<EntityType, string> = {
  DONANTE: 'bg-indigo-500',
  RECEPTORA: 'bg-rose-500',
  PACIENTE: 'bg-sky-500',
  EMBRION: 'bg-amber-500',
};

export const ENTITY_TYPE_INITIAL: Record<EntityType, string> = {
  DONANTE: 'D',
  RECEPTORA: 'R',
  PACIENTE: 'P',
  EMBRION: 'E',
};

export const ENTITY_TYPE_TAB_ACTIVE: Record<EntityType, string> = {
  DONANTE: 'bg-indigo-50 text-indigo-700 border-indigo-300',
  RECEPTORA: 'bg-rose-50 text-rose-700 border-rose-300',
  PACIENTE: 'bg-sky-50 text-sky-700 border-sky-300',
  EMBRION: 'bg-amber-50 text-amber-700 border-amber-300',
};
