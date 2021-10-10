import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from '@rds-auth/models/user.model';

import { from, Observable, of } from 'rxjs';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { switchMap } from 'rxjs/operators';

import { Group, UserDomain } from '@rds-admin/models/users-domain.model';
@Injectable()
export class AdminFireService {
  user$: Observable<firebase.User>;
  private userCollection: string = 'users';
  constructor(
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFirestore
  ) {
    this.user$ = this.getAuthState().pipe(
      switchMap((user) => {
        if (user) {
          return this.afStore
            .collection(`${this.userCollection}/${user.providerData[0].uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  getUsers(): Observable<UserDomain[]> {
    return this.afStore
      .collection<UserDomain>(`${this.userCollection}`)
      .valueChanges();
  }

  async createUser(user: any) {
    const key = user.id;
    return await this.afStore
      .collection(`${this.userCollection}`)
      .doc(key)
      .set(user, { merge: true })
      .then(() =>
        this.afDatabase
          .object<User>(`${this.userCollection}/${user.id}`)
          .update(user)
      );
  }

  async createGroup(group: Group) {
    const key = group.id;
    console.log(group.name);
    return await this.afStore
      .collection('groups')
      .doc(key)
      .set(group, { merge: true });
  }
}
