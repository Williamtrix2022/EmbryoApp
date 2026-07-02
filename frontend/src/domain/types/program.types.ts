export type ProgramStatus =
  | 'PLANIFICADO'
  | 'EN_CURSO'
  | 'PAUSADO'
  | 'COMPLETADO'
  | 'CANCELADO';

export interface Program {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: ProgramStatus;
  startDate: string;
  estimatedEndDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProgramInput {
  name: string;
  code: string;
  startDate: string;
  estimatedEndDate?: string;
  notes?: string;
}

// Transiciones válidas por estado (espejo de la regla del backend)
export const STATUS_TRANSITIONS: Record<ProgramStatus, ProgramStatus[]> = {
  PLANIFICADO: ['EN_CURSO', 'CANCELADO'],
  EN_CURSO:    ['PAUSADO', 'COMPLETADO', 'CANCELADO'],
  PAUSADO:     ['EN_CURSO', 'CANCELADO'],
  COMPLETADO:  [],
  CANCELADO:   [],
};

export const STATUS_LABELS: Record<ProgramStatus, string> = {
  PLANIFICADO: 'Planificado',
  EN_CURSO:    'En curso',
  PAUSADO:     'Pausado',
  COMPLETADO:  'Completado',
  CANCELADO:   'Cancelado',
};

// Clases Tailwind para el badge de cada estado
export const STATUS_BADGE: Record<ProgramStatus, string> = {
  PLANIFICADO: 'bg-blue-100 text-blue-700 ring-blue-200',
  EN_CURSO:    'bg-emerald-100 text-emerald-700 ring-emerald-200',
  PAUSADO:     'bg-amber-100 text-amber-700 ring-amber-200',
  COMPLETADO:  'bg-slate-100 text-slate-600 ring-slate-200',
  CANCELADO:   'bg-red-100 text-red-600 ring-red-200',
};

// Color del botón de transición hacia ese estado
export const STATUS_TRANSITION_BUTTON: Record<ProgramStatus, string> = {
  PLANIFICADO: 'border-blue-300 text-blue-700 hover:bg-blue-50',
  EN_CURSO:    'border-emerald-300 text-emerald-700 hover:bg-emerald-50',
  PAUSADO:     'border-amber-300 text-amber-700 hover:bg-amber-50',
  COMPLETADO:  'border-slate-300 text-slate-600 hover:bg-slate-50',
  CANCELADO:   'border-red-300 text-red-600 hover:bg-red-50',
};
