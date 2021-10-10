import { SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';

export interface CourseRoom {
  id: string;
  roomId: string;
  mainTeacherId: string;
  mainTeacher?: User;
  priority: number;
  grade?: SchoolLevel;
  cicle?: string;
  name: string;
  description: string;
  courseType: CourseType;
  secondaryTeachersId?: string[];
}

export enum CourseType {
  formativo,
  optativo,
}
