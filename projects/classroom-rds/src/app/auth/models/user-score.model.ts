export interface UserScore {
  id: string;
  uid?: string;
  observations: string;
  scores: [{
    courseName: string;
    unidad1: string;
    unidad2: string;
    unidad3: string;
    notes1: string;
    notes2: string;
    notes3: string;
    final: number;
  }]
}
