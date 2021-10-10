import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AuthFireService } from '@rds-auth/services';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { of } from 'rxjs';

import { Group, UserStudent } from '../models/users-domain.model';

@Injectable()
export class GroupsService {
  user$;
  constructor(
    private authFireService: AuthFireService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.user$ = this.authFireService.getAuthState();
  }

  get() {
    return this.afs
      .collection<Group>('groups', (ref) => ref.orderBy('priority'))
      .valueChanges({ idField: 'id' });
  }
  createGroup(data: Group): Promise<void> {
    const dbKey = this.db.createPushId();
    const fsKey = this.afs.createId();
    this.db.list(`groups`).push({ ...data, id: dbKey });
    return this.afs
      .collection('groups')
      .doc(data.id)
      .set({
        ...data,
      });
  }
  /**
   * Update a partial Group Info for the current User
   */
  update(group: Group) {
    return of(
      this.db
        .object(`groups/${group.id}`)
        .update({
          name: group.name,
          level: group.level,
          grade: group.grade,
          priority: group.priority,
        })
        .then(() => this.updateGroupInfo(group))
    );
  }

  updateGroupInfo(data: Group) {
    this.afs.collection('groups').doc(data.id).update({
      name: data.name,
      level: data.level,
      grade: data.grade,
      priority: data.priority,
    });
  }

  // map(groups => groups.sort((a, b) => a.priority - b.priority))

  /**
   * Run a batch write to change the priority of each group for sorting
   */
  sortGroups(groups: Group[]): void {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = groups.map((b) => db.collection('groups').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * Delete group
   */
  deleteGroup(group: Group, userId: string): Promise<void> {
    this.db.object(`groups/${group.id}`).remove();
    return this.afs.collection('groups').doc(group.id).delete();
  }

  /**
   * Updates the tasks on group
   */
  updateStudents(groupId: string, students: UserStudent[]): Promise<void> {
    return this.afs.collection('groups').doc(groupId).update({ students });
  }

  /**
   * Remove a specifc task from the group
   */
  removeStudent(groupId: string, student: UserStudent): Promise<void> {
    return this.afs
      .collection('groups')
      .doc(groupId)
      .update({
        student: firebase.firestore.FieldValue.arrayRemove(student),
      });
  }
}
