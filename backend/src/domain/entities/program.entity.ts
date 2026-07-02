import { AppError } from '../../shared/errors/app-error';

export type ProgramStatus =
  | 'PLANIFICADO'
  | 'EN_CURSO'
  | 'PAUSADO'
  | 'COMPLETADO'
  | 'CANCELADO';

// Transiciones válidas de estado
const VALID_TRANSITIONS: Record<ProgramStatus, ProgramStatus[]> = {
  PLANIFICADO: ['EN_CURSO', 'CANCELADO'],
  EN_CURSO:    ['PAUSADO', 'COMPLETADO', 'CANCELADO'],
  PAUSADO:     ['EN_CURSO', 'CANCELADO'],
  COMPLETADO:  [],
  CANCELADO:   [],
};

export interface ProgramProps {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: ProgramStatus;
  startDate: Date;
  estimatedEndDate: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Program {
  readonly id: string;
  readonly organizationId: string;
  readonly code: string;
  readonly name: string;
  readonly status: ProgramStatus;
  readonly startDate: Date;
  readonly estimatedEndDate: Date | null;
  readonly notes: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: ProgramProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this.code = props.code;
    this.name = props.name;
    this.status = props.status;
    this.startDate = props.startDate;
    this.estimatedEndDate = props.estimatedEndDate;
    this.notes = props.notes;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  canTransitionTo(newStatus: ProgramStatus): boolean {
    return VALID_TRANSITIONS[this.status].includes(newStatus);
  }

  assertCanTransitionTo(newStatus: ProgramStatus): void {
    if (!this.canTransitionTo(newStatus)) {
      throw new AppError(
        `No se puede cambiar el estado de "${this.status}" a "${newStatus}"`,
        422,
      );
    }
  }

  isActive(): boolean {
    return this.status === 'EN_CURSO' || this.status === 'PLANIFICADO';
  }
}
