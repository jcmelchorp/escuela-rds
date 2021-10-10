import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import {
  faUserPlus,
  faSync,
  faPlus,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import { SchoolService } from '@rds-school/services/school.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoomCourseDialogComponent } from '../room-course-dialog/room-course-dialog.component';
import { UserRoomDialogComponent } from '../user-room-dialog/user-room-dialog.component';
import { Room } from './../../models/room.model';
import { RoomService } from '../../services/room.service';
import { User } from '@rds-auth/models/user.model';
import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { CourseRoom, CourseType } from '@rds-subjects/models/course-room.model';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @Input() roomInput: Room;
  room$: Observable<Room>;
  user: Partial<User>;
  roomStudents: Partial<User>[];
  teachers$: Observable<User[]>;
  roomStudents$: Observable<User[]>;
  roomCourses$: Observable<CourseRoom[]>;
  loading$: Observable<boolean>;
  faEdit = faEdit;
  faUserEdit = faUserEdit;
  faSync = faSync;
  faUserPlus = faUserPlus;
  faPlus = faPlus;
  constructor(
    private schoolService: SchoolService,
    private userEntityService: UserEntityService,
    private courseRoomEntityService: CourseRoomEntityService,
    private roomService: RoomService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {}

  handleCourseDelete(course: CourseRoom): void {
    this.roomService.removeCourse(this.roomInput.id, course);
  }
  handleStudentDelete(student: any): void {
    this.roomService.removeStudent(this.roomInput.id, student);
  }
  fetchStudents(room: Room) {
    this.userEntityService.entities$
      .pipe(
        map((users) => {
          const grade = room.grade.toString();
          return users
            .filter((u) => u.grade == grade)
            .map((student, index) => {
              return {
                id: student.id,
                priority: index,
                label: 'red',
              } as Partial<User>;
            });
        })
      )
      .subscribe((students) =>
        this.roomService.updateStudents(
          this.roomInput.id,
          this.roomInput.cicle,
          students
        )
      )
      .unsubscribe();
  }

  fetchCourses(room: Room) {
    this.courseRoomEntityService.entities$
      .pipe(
        map((courses) => {
          const grade = room.grade.toString();
          return courses
            .filter((c) => c.grade)
            .map((course) => {
              return {
                id: course.id,
                priority: course.priority,
                name: course.name,
                roomId: room.id,
                courseType: course.courseType,
                description: course.description,
                mainTeacherId: course.mainTeacherId,
              } as Partial<CourseRoom>;
            });
        })
      )
      .subscribe((courses) =>
        this.roomService.updateCourses(
          this.roomInput.id,
          this.roomInput.cicle,
          courses
        )
      )
      .unsubscribe();
  }
  studentDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.roomInput.students,
      event.previousIndex,
      event.currentIndex
    );
    this.roomService.updateStudents(
      this.roomInput.id,
      this.roomInput.cicle,
      this.roomInput.students
    );
  }
  courseDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.roomInput.courses,
      event.previousIndex,
      event.currentIndex
    );
    this.roomService.updateCourses(
      this.roomInput.id,
      this.roomInput.cicle,
      this.roomInput.courses
    );
  }

  openDialog(student?: Partial<User>, idx?: number): void {
    const newStudent: Partial<User> = { primaryEmail: '', label: 'blue' };
    const dialogRef = this.dialog.open(UserRoomDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: student
        ? {
            student: { ...student },
            isNew: false,
            roomId: this.roomInput.id,
            idx,
          }
        : { student: { ...newStudent }, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.userEntityService.entities$
            .pipe(
              map((users) =>
                users.find((u) => u.primaryEmail == result.student.primaryEmail)
              )
            )
            .subscribe(
              (user) =>
                (result.student = {
                  id: user.id,
                  name: {
                    fullName: user.name.fullName,
                    givenName: user.name.givenName,
                    familyName: user.name.familyName,
                  },
                  primaryEmail: user.primaryEmail,
                  photoUrl: user.thumbnailPhotoUrl,
                  label: result.student.label,
                })
            );
          this.roomService.updateStudents(
            this.roomInput.id,
            this.roomInput.cicle,
            [...this.roomInput.students, result.student]
          );
        } else {
          const update = this.roomInput.students;
          update.splice(result.idx, 1, result.student);
          this.roomService.updateStudents(
            this.roomInput.id,
            this.roomInput.cicle,
            this.roomInput.students
          );
        }
        this.roomInput.students.forEach((student) => {
          this.schoolService.updateUser(student.id, {
            grade: this.roomInput.grade.toString(),
          });
        });
      }
    });
  }
  openCoursesDialog(course?: CourseRoom, idx?: number): void {
    const newCourse: Partial<CourseRoom> = {
      name: '',
      roomId: this.roomInput.id,
      mainTeacherId: '',
      description: '',
      grade: this.roomInput.grade,
      courseType: CourseType.formativo,
      secondaryTeachersId: [],
    };

    const dialogRef = this.dialog.open(RoomCourseDialogComponent, {
      width: 'fit-content',
      minWidth: '400px',
      height: 'fit-content',
      data: course
        ? { course: { ...course }, isNew: false, idx }
        : { course: { ...newCourse }, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          console.log(result);
          const newCourses: CourseRoom[] = this.roomInput.courses;
          newCourses.push(result.course);
          this.roomService.updateCourses(
            this.roomInput.id,
            this.roomInput.cicle,
            newCourses
          );
          this.courseRoomEntityService.add(result.course, {
            isOptimistic: false,
          });
        } else {
          const update = this.roomInput.courses;
          update.splice(result.idx, 1, result.course);
          this.roomService.updateCourses(
            this.roomInput.id,
            this.roomInput.cicle,
            update
          );
        }
        /* this.room.students.forEach(student => {
          this.schoolService.updateUser(student.id, { grade: this.room.grade })

        }); */
      }
    });
  }
  handleDelete() {
    this.roomService.deleteRoom(this.roomInput.id).then(
      () =>
        this.toastr.warning(
          `${this.roomInput.name} fue eliminado con éxito`,
          'Sistema escolar'
        ),
      (error) =>
        this.toastr.error(
          `No fue posible crear "${this.roomInput.name}"`,
          `Error: ${error.code}`
        )
    );
  }
}
