import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Grade } from '../../user/models/grade.model';

@Injectable()
export class ScoreService {
  private scoresCollection: string = 'grades';
  constructor(private afDatabase: AngularFireDatabase) { }

  getUserScores(userId: string, cicle: string) {
    return this.afDatabase.object<Grade>(`${this.scoresCollection}/${userId}/${cicle}`).valueChanges().toPromise();
  }

  setUserScores(grade: Grade) {
    return this.afDatabase
      .object<Grade>(`${this.scoresCollection}/${grade.userId}/${grade.cicleId}`)
      .set({ ...grade });
  }
}
