import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from '@firebase/util';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class CoreService {
  private configsCollection: string = 'configs';
  constructor(private afDatabase: AngularFireDatabase,
  ) { }
  getConfigs() {
    return this.afDatabase.object<{ id: string, cicle: string }>(`${this.configsCollection}/defaultPeriod`)
      .valueChanges();

  }
}
