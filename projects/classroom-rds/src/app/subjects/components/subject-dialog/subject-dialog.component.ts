import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

import { faBook, faTimes } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CourseType, CourseRoom } from './../../models/course-room.model';
import { User } from '@rds-auth/models/user.model';
import { Room, RoomState } from '@rds-rooms/models/room.model';
import { RoomService } from '@rds-rooms/services/room.service';
import { UserEntityService } from '@rds-store/user/user-entity.service';
@Component({
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss'],
})
export class SubjectDialogComponent {
  teachers$: Observable<User[]>;
  rooms$: Observable<Room[]>;
  periods$: Observable<string[]>;
  faTimes = faTimes;
  faBook = faBook;
  roomStates = RoomState;
  //courseNames = new Set([]);
  formData: FormGroup;
  keys;
  types = CourseType;
  constructor(
    private dialogRef: MatDialogRef<SubjectDialogComponent>,
    private userEntityService: UserEntityService,
    private roomService: RoomService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.keys = Object.keys(this.types).filter((x) => x.length == 1);
    this.formData = this.fb.group({
      name: new FormControl(this.data.course.name, Validators.required),
      roomId: new FormControl(this.data.course.roomId),
      mainTeacherId: new FormControl(this.data.course.mainTeacherId),
      courseType: new FormControl(this.data.course.CourseType),
      description: new FormControl(this.data.course.description),
      cicle: new FormControl(this.data.course.cicle),
    });
    this.periods$ = this.roomService.getPeriods();
    this.rooms$ = this.roomService
      .getRoomsOnCicle(this.data.course.cicle)
      .pipe(
        map((rooms) => rooms.filter((r) => r.status.toString() == 'activo'))
      );
    this.teachers$ = this.userEntityService.entities$.pipe(
      map((users) => {
        return users.filter((x) => x.isTeacher == true && x.suspended == false);
      })
    );
  }
  /* addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.courseNames.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.courseNames.delete(keyword);
  } */
  resetData() {
    this.formData.reset();
  }
  saveData() {
    if (this.formData.valid) {
      const course: CourseRoom = {
        id: this.data.course.id,
        roomId: this.formData.controls.roomId.value,
        name: this.formData.controls.name.value,
        priority: this.data.course.priority,
        cicle: this.formData.controls.cicle.value,
        description: this.formData.controls.description.value,
        courseType: this.formData.controls.courseType.value,
        mainTeacherId: this.formData.controls.mainTeacherId.value,
      };
      this.dialogRef.close({
        course: course,
        isNew: this.data.isNew,
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
