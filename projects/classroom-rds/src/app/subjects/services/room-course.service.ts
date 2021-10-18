import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

import { QueryParams } from '@ngrx/data';

import { Observable, of } from 'rxjs';
import {
  map,
  take,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap,
} from 'rxjs/operators';

import { CourseRoom } from '../models/course-room.model';

@Injectable()
export class RoomCourseService {
  private courseCollection: string = 'courses';
  private periodCollection: string = 'periods';
  private currentCicle: string;
  roomCourseRef: AngularFireList<any>;
  constructor(
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFirestore
  ) {
    this.currentCicle = '20202021';
    /*  this.roomCourseRef = this.afDatabase.list<CourseRoom>(
      this.courseCollection,
      (ref) => ref.orderByChild('grade')
    ); */
  }
  add(course: CourseRoom) {
    const dbKey = this.afDatabase.createPushId();
    this.afDatabase
      .object<CourseRoom>(`${this.courseCollection}/${dbKey}`)
      .set({ ...course, id: dbKey })
      .then(
        () => console.log('Course created on Firestore'),
        () => console.log('Error creating user on Firestore')
      );
    this.afStore
      .collection<CourseRoom>(this.courseCollection).doc(dbKey).set({
        id: dbKey,
        grade: course.grade,
        mainTeacherId: course.mainTeacherId,
        priority: course.priority,
        description: course.description,
        name: course.name,
        courseType: course.courseType,
      })

    /* return this.afDatabase.object<CourseRoom>(`${this.classesCollection}/${dbKey}`).valueChanges(); */
    return this.get(dbKey).pipe(take(1));
  }
  updateCourseRoom(id: string, changes: Partial<CourseRoom>) {
    this.afStore
      .collection(this.periodCollection)
      .doc(changes.cicle)
      .collection<CourseRoom>(this.courseCollection)
      .doc(id)
      .update({
        id: changes.id,
        roomId: changes.roomId,
        mainTeacherId: changes.mainTeacherId,
        priority: changes.priority,
        description: changes.description,
        name: changes.name,
        courseType: changes.courseType,
      });
    this.afDatabase
      .object<CourseRoom>(`${this.courseCollection}/${id}`)
      .update(changes);
    return this.get(id);
  }
  getPeriods() {
    let periods: any[];
    return this.afStore
      .collection<string>(this.periodCollection, (ref) => ref.orderBy('cicle'))
      .valueChanges({ idField: 'id' });

  }
  list() {
    return this.afStore
      .collection<CourseRoom>(this.courseCollection, (ref) =>
        ref.orderBy('priority')
      )
      .valueChanges();
  }
  /*return this.roomCourseRef.valueChanges();
      .pipe(
      map((courses) => {
        courses.forEach((course) =>
          this.afStore
            .collection('periods')
            .doc('20202021')
            .collection('courses')
            .doc(course.id)
            .set({ ...course, cicle: '20202021' })
        );

      })
    ); */

  getCoursesOnClicle(cicle: string): Observable<CourseRoom[]> {
    return this.afStore
      .collection(this.periodCollection)
      .doc(cicle)
      .collection<CourseRoom>(this.courseCollection)
      .valueChanges();
    /* return this.afDatabase
      .list<CourseRoom>(this.courseCollection, (ref) =>
        ref.child(`id/${field}`).equalTo(value)
      )
      .valueChanges(); */
  }
  getCoursesWithQuery(query: QueryParams): Observable<CourseRoom[]> {
    return this.afStore
      .collection(this.periodCollection)
      .doc(this.currentCicle)
      .collection<CourseRoom>(this.courseCollection, (ref) =>
        ref.where(
          query['field'].toString(),
          query['operation'] as any,
          query['value'].toString()
        )
      )
      .valueChanges()
      .pipe(take(1));
    /* return this.afDatabase
      .list<CourseRoom>(this.courseCollection, (ref) =>
        ref.child(`id/${field}`).equalTo(value)
      )
      .valueChanges(); */
  }
  get(id?: string): Observable<CourseRoom> {
    return this.afDatabase
      .object<CourseRoom>(`${this.courseCollection}/${id}`)
      .valueChanges();
  }
  async delete(roomCoursesId: string) {
    await this.afDatabase
      .object<CourseRoom>(`${this.courseCollection}/${roomCoursesId}`)
      .remove();
    return this.afDatabase
      .object<CourseRoom>(`${this.courseCollection}/${roomCoursesId}`)
      .valueChanges();
  }
}
