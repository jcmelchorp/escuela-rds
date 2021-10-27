import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { CourseRoom } from '@rds-subjects/models/course-room.model';

import { User } from '@rds-auth/models/user.model';
import { UserStudent } from '@rds-auth/models/user-student.model';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { from, Observable } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';

import { Room } from '../models/room.model';
@Injectable()
export class RoomService {
  private roomsCollection: string = 'rooms';
  private periodCollection: string = 'periods';

  roomsRef: AngularFirestoreCollection<Room>;
  roomsRTDB: AngularFireList<Room>;
  constructor(
    private afs: AngularFirestore,
    private afDatabase: AngularFireDatabase
  ) { }

  getPeriods(): Observable<string[]> {
    return this.afs
      .collection<string>(this.periodCollection, (ref) => ref.orderBy('cicle'))
      .valueChanges({ idField: 'id' });
  }

  /**
   * Creates a new room
   */
  createRoom(room: Room): Observable<Room> {
    const fsKey = this.afs.createId();
    this.afs
      .collection(this.periodCollection)
      .doc(room.cicle)
      .collection<Room>(this.roomsCollection)
      .doc(fsKey)
      .set({ ...room, id: fsKey }, { merge: true });
    this.afDatabase
      .object<Room>(`${this.roomsCollection}/${fsKey}`)
      .set({ ...room, id: fsKey });
    return this.getRoomById(fsKey, room.cicle);
  }

  /**
   * Get all rooms
   */
  getRoomsOnCicle(cicle: string): Observable<Room[]> {
    const roomsRef = this.afs
      .collection(this.periodCollection)
      .doc(cicle)
      .collection<Room>(this.roomsCollection, (ref) => ref.orderBy('priority'));
    return roomsRef.valueChanges() /* .pipe(
      map((rooms) => {
        rooms.forEach((room) =>
          this.afs
            .collection<Room>(`periods/20202021/${this.roomsCollection}`)
            .doc(room.id)
            .set({ ...room, id: room.id }, { merge: true })
        );
        return rooms;
      })
    ) */;
  }
  getRoomById(id: string, cicle?: string): Observable<Room> {
    return this.afs
      .collection(this.periodCollection)
      .doc(cicle)
      .collection<Room>(this.roomsCollection)
      .doc(id)
      .valueChanges()
      .pipe(take(1));
  }
  getRoomByGrade(grade: string, cicle?: string): Observable<Room> {
    return this.afs
      .collection(this.periodCollection)
      .doc(cicle)
      .collection<Room>(this.roomsCollection, (ref) =>
        ref.where('grade', '==', grade)
      )
      .valueChanges()
      .pipe(take(1), map(rooms => rooms[0]));
  }
  /**
   * Updates room
   */
  async updateRoom(room: Partial<Room>) {
    this.afDatabase
      .object<Room>(`${this.roomsCollection}/${room.id}`)
      .set(room as Room)
      .then(
        () => console.log('Room created on Realtime DB'),
        () => console.log('Error creating user on Realtime DB')
      );
    return await this.afs
      .collection(this.periodCollection)
      .doc(room.cicle)
      .collection<Room>(this.roomsCollection)
      .doc(room.id)
      .update(room);
  }

  /**
   * Delete room
   */
  async deleteRoom(roomId: string) {
    return await this.roomsRef.doc(roomId).delete();
  }

  getStudents(roomId: string, cicle?: string): Observable<Partial<User>[]> {
    return this.afs
      .collection(this.periodCollection)
      .doc(cicle)
      .collection(this.roomsCollection)
      .doc<Room>(roomId)
      .collection('students')
      .valueChanges();
  }

  /**
   * Updates students on a group
   */
  updateStudents(
    roomId: string,
    cicle: string,
    students: Partial<User>[]
  ): Promise<void> {
    console.log(students);
    return this.afs
      .collection(this.periodCollection)
      .doc(cicle)
      .collection(this.roomsCollection)
      .doc(roomId)
      .update({ students });
  }

  /**
   * Remove a specifc task from the quiz
   */
  removeStudent(roomId: string, student: Partial<User>): Promise<void> {
    return this.afs
      .collection(this.roomsCollection)
      .doc(roomId)
      .update({
        students: firebase.firestore.FieldValue.arrayRemove(student),
      });
  }

  /**
   * Updates the courses on a group
   */
  async updateCourses(
    roomId: string,
    cicle: string,
    courses: Partial<CourseRoom>[]
  ): Promise<void> {
    return this.afs
      .collection(this.periodCollection)
      .doc(cicle)
      .collection<Room>(this.roomsCollection)
      .doc(roomId)
      .update({ courses: courses as CourseRoom[] });
  }
  /**
   * Remove a specifc task from the quiz
   */
  removeCourse(roomId: string, course: CourseRoom): Promise<void> {
    return this.afs
      .collection(this.periodCollection)
      .doc(course.cicle)
      .collection(this.roomsCollection)
      .doc(roomId)
      .update({ courses: firebase.firestore.FieldValue.arrayRemove(course) });
  }
}
