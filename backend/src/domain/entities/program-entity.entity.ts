export type ProgramEntityType = 'DONANTE' | 'RECEPTORA' | 'PACIENTE' | 'EMBRION';
export type ProgramEntityStatus = 'ACTIVA' | 'INACTIVA';

export interface ProgramEntityProps {
  id: string;
  programId: string;
  entityType: ProgramEntityType;
  name: string;
  externalReference: string | null;
  status: ProgramEntityStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class ProgramEntity {
  readonly id: string;
  readonly programId: string;
  readonly entityType: ProgramEntityType;
  readonly name: string;
  readonly externalReference: string | null;
  readonly status: ProgramEntityStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: ProgramEntityProps) {
    this.id = props.id;
    this.programId = props.programId;
    this.entityType = props.entityType;
    this.name = props.name;
    this.externalReference = props.externalReference;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  isActive(): boolean {
    return this.status === 'ACTIVA';
  }
}
