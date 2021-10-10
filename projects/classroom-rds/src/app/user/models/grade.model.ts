export interface Score {
  courseName: string;
  unit1: string;
  unit2: string;
  unit3: string;
  notes1: string;
  notes2: string;
  notes3: string;
  recover1?: boolean;
  recover2?: boolean;
  recover3?: boolean;
  final: number;
  isCourseClosed: boolean;
}
export interface Grade {
  isFinished?: boolean
  notes?: string[];
  scores: Score[];
}
