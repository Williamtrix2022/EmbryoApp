export type UserRole = 'ADMINISTRADOR' | 'VETERINARIO' | 'OPERADOR' | 'LECTOR';
export type UserStatus = 'ACTIVO' | 'INACTIVO';

export interface UserProps {
  id: string;
  organizationId: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
}

export class User {
  readonly id: string;
  readonly organizationId: string;
  readonly fullName: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly role: UserRole;
  readonly status: UserStatus;

  constructor(props: UserProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this.fullName = props.fullName;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.role = props.role;
    this.status = props.status;
  }

  isActive(): boolean {
    return this.status === 'ACTIVO';
  }
}
