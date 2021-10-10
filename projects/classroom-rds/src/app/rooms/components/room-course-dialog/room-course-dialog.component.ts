import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faBook, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { User } from '@rds-auth/models/user.model';
import { CourseType } from '@rds-subjects/models/course-room.model';
@Component({
  templateUrl: './room-course-dialog.component.html',
  styleUrls: ['./room-course-dialog.component.scss'],
})
export class RoomCourseDialogComponent {
  faTimes = faTimes;
  faBook = faBook;
  teachers$: Observable<User[]>;
  courses$: Observable<CourseRoom[]>;

  /* courseNames = new Set([]); */
  formData: FormGroup;
  keys;
  types = CourseType;
  constructor(
    public dialogRef: MatDialogRef<RoomCourseDialogComponent>,
    private userEntityService: UserEntityService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.keys = Object.keys(this.types).filter((x) => x.length == 1);
    this.formData = this.fb.group({
      /* courseNames: new FormControl([]), */
      name: new FormControl(data.course.name, Validators.required),
      description: new FormControl(data.course.description),
      roomId: new FormControl(data.course.roomId),
      //grade: new FormControl(data.course.grade, Validators.required),
      courseType: new FormControl(data.course.CourseType, Validators.required),
      //status: new FormControl(data.course.status, Validators.required),
      mainTeacherId: new FormControl(data.course.mainTeacherId),
    });
    this.teachers$ = this.userEntityService.entities$.pipe(
      map((users) =>
        users
          .filter((x) => x.isTeacher == true)
          .filter((t) => t.suspended == false)
      )
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
  /*  saveData() {
     if (this.formData.valid) {
       this.formData.get('courseNames').valueChanges.pipe(
         map(
           (courseNames: string[]) => {
             return courseNames.map(
               (courseName: string) => {
                 const courseRoom: CourseRoom = { ...this.data.course, name: courseName };
                 return courseRoom;
               }
             )

           }
         )
       ).subscribe(courses => {
         this.dialogRef.close({ courses, isNew: this.data.isNew });
       });
     }
   } */
  saveData() {
    console.log(...this.formData.value);
    if (this.formData.valid) {
      this.dialogRef.close({
        course: { ...this.data.course, ...this.formData.value },
        isNew: this.data.isNew,
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
