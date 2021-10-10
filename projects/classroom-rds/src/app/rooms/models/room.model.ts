import { SchoolLevel } from '@rds-auth/models/user.enum';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { User } from '@rds-auth/models/user.model';

export interface Room {
  id: string;
  priority?: number;
  name: string;
  status: RoomState;
  description?: string;
  grade: SchoolLevel;
  courses?: CourseRoom[];
  students?: Partial<User[]>;
  cicle?: string;
}

export enum RoomState {
  indefinido,
  borrador,
  activo,
  archivado,
  inactivo,
}
