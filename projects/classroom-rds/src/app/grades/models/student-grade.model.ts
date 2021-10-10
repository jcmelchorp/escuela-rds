export interface StudentGrade {
  id?: string;
  course: {
    id: string;
    name: string;
  },
  student: {
    id: string;
    name: string
  },
  evaluationYear?: string;
  evaluationType?: string;
  evaluationUnit?: number;
  grade?: number;
  observations?: string;
}
export enum CourseRoles {
  ADMIN,
  OWNER,
  TEACHER,
  STUDENT,
}
export const studentGradeAttributesMapping = {
  id: 'Id',
  course: {
    _prefix: 'Materia',
    id: 'Id',
    name: 'Nombre'
  },
  student: {
    _prefix: 'Alumno',
    id: 'Id',
    name: 'Nombre'
  },
  evaluationYear: 'Ciclo escolar',
  evaluationType: 'Tipo de evaluación',
  evaluationUnit: 'Unidad',
  grade: 'Calificación',
  observations: 'Observaciones',
};

