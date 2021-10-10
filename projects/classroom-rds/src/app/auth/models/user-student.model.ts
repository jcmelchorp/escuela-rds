import { UserParent } from './user-parent.model';
export interface UserStudent {
  id: string;
  uid?: string;
  curp?: string;

  dayOfBirth?: string;
  gender?: 'Hombre' | 'Mujer';
  role?: string;

  niev?: string;
  grade?: string;
  level?: string;
  parents?: UserParent[];
  currentPeriod?: {};
}
