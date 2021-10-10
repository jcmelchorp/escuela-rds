import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@rds-auth/models/user.model';
import { Room } from '@rds-rooms/models/room.model';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
@Injectable()
export class TeachersCoursesService {
  private courseCollection: string = 'courses';
  private userCollection: string = 'users';
  private roonCollection: string = 'rooms';
  private currentCicle: string;
  userRef: AngularFireList<User>;
  courseRef: AngularFireList<CourseRoom>;
  coursesCollRef: AngularFirestoreCollection;
  constructor(
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFirestore,
    private toastrService: ToastrService
  ) {
    this.courseRef = this.afDatabase.list<CourseRoom>(
      this.courseCollection,
      (ref) => ref.orderByChild('grade')
    );
    this.userRef = this.afDatabase.list<User>(this.userCollection, (ref) =>
      ref.orderByChild('name/fullName')
    );
    this.currentCicle = '20202021';
    this.coursesCollRef = this.afStore
      .collection('periods')
      .doc(this.currentCicle)
      .collection<CourseRoom>(this.courseCollection, (ref) =>
        ref.where('cicle', '==', this.currentCicle)
      );
  }
  getById(id?: string): Observable<CourseRoom | undefined> {
    return this.afStore
      .collection('periods')
      .doc(this.currentCicle)
      .collection<CourseRoom>(this.courseCollection, (ref) =>
        ref.where('cicle', '==', this.currentCicle)
      )
      .doc(id)
      .valueChanges();
  }
  getByTeacherId(userId: string): Observable<CourseRoom[]> {
    return this.afStore
      .collection('periods')
      .doc(this.currentCicle)
      .collection<CourseRoom>(this.courseCollection, (ref) =>
        ref.orderBy('mainTeacherId').where('mainTeacherId', '==', userId)
      )
      .valueChanges();
    //(this.courseCollection, ref => ref.child(`id/${field}`).equalTo(value)).valueChanges()
    //.list<CourseRoom>(this.courseCollection, ref => ref.child(field).equalTo(value)).valueChanges();
  }
  update(id: string, changes: Partial<CourseRoom>) {
    from(
      this.afStore
        .collection('periods')
        .doc(this.currentCicle)
        .collection<CourseRoom>(this.courseCollection)
        .doc(id)
        .update(changes)
    ).pipe(map((_) => this.getById(id)));
  }
  getAllCourses() {
    return this.afStore
      .collection('periods')
      .doc(this.currentCicle)
      .collection<CourseRoom>(this.courseCollection, (ref) =>
        ref.where('cicle', '==', this.currentCicle)
      )
      .valueChanges();
  }
  gradeFromRoom(roomId: string) {
    return this.afStore
      .collection('periods')
      .doc(this.currentCicle)
      .collection<Room>(this.roonCollection)
      .doc(roomId)
      .valueChanges()
      .pipe(map((room) => room!.grade.toLocaleString()));
  }
  getCoursesByGrade(grade: string): Observable<CourseRoom[]> {
    return this.afStore
      .collection('periods')
      .doc(this.currentCicle)
      .collection<CourseRoom>(this.courseCollection, (ref) =>
        ref.orderBy('grade').where('grade', '==', grade)
      )
      .valueChanges();
  }

  async delete(roomCoursesId: string) {
    this.afDatabase
      .object<CourseRoom>(`${this.courseCollection}/${roomCoursesId}`)
      .remove();
    return this.afDatabase
      .object<CourseRoom>(`${this.courseCollection}/${roomCoursesId}`)
      .valueChanges();
  }
  getUser(id: string): Observable<User | null> {
    return this.afDatabase
      .object<User>(`${this.userCollection}/${id}`)
      .valueChanges();
  }
  updateUser(id: string, user: Partial<User>) {
    this.afDatabase
      .object<User>(`${this.userCollection}/${id}`)
      .update(user)
      .then(() => {
        this.toastrService.success(
          `Calificación de ${user.displayName} aceptada`,
          `RTDB`
        );
      })
      .catch((reason) =>
        this.toastrService.error(`Ocurrió un error: ${reason}`, 'Error', {
          timeOut: 10000,
        })
      );
    this.afStore
      .collection<User>(`${this.userCollection}`)
      .doc(id)
      .update(user)
      .then(() => {
        this.toastrService.success(
          `Calificación de ${user.displayName} aceptada`,
          `Firestore`
        );
      })
      .catch((reason) =>
        this.toastrService.error(`Ocurrió un error: ${reason}`, 'Error', {
          timeOut: 10000,
        })
      );
  }
  getUsersByGrade(grade: string) {
    const studentsRef = this.afStore
      .collection('periods')
      .doc(this.currentCicle)
      .collection<User>(this.roonCollection, (ref) =>
        ref.where('grade', '==', grade.toString())
      );
    return studentsRef.valueChanges();
  }
  getTeachers() {
    return this.afStore
      .collection<User>(this.userCollection, (ref) =>
        ref.where('role', '==', 'profesores')
      )
      .valueChanges()
      .pipe(map((users) => users.filter((u) => u.suspended == false)));
  }
}
