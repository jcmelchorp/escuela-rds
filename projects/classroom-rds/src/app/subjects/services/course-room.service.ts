import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

import { CourseRoom } from './../models/course-room.model';
import { FirestoreService } from '@rds-shared/services/firestore.service';

@Injectable()
export class CourseRoomService extends FirestoreService<CourseRoom> {
  constructor(public db: AngularFirestore) {
    super('courses', db);
  }
}
