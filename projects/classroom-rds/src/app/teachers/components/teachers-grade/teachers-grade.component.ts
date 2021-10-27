import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TeachersCoursesService } from '../../services/teachers-courses.service';
import { User } from '@rds-auth/models/user.model';

import { Score } from '@rds-user/models/grade.model';
import { Room } from '@rds-rooms/models/room.model';
import { RoomService } from '@rds-rooms/services/room.service';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
@Component({
  selector: 'app-teachers-grade',
  templateUrl: './teachers-grade.component.html',
  styleUrls: ['./teachers-grade.component.scss'],
})
export class TeachersGradeComponent implements OnInit {
  courseId: string;
  room!: Room;
  course!: CourseRoom | undefined;
  students$!: Observable<User[]>;
  faChevronLeft = faChevronLeft;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  formGrades!: FormGroup;
  studentsSubscription!: Subscription;
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['studentName', 'unit1', 'unit2', 'unit3', 'action'];
  currentGrades!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private teachersCoursesService: TeachersCoursesService,
    private roomService: RoomService,
    private fb: FormBuilder
  ) {
    this.courseId = this.route.snapshot.params.courseId;
    /* this.formGrades = this.fb.group({
      scores: this.fb.array([])
    }) */
  }
  /*  updateView() {
     this.dataSource.next(this.scores.controls);
   } */
  ngOnInit(): void {
    this.students$ = this.teachersCoursesService
      .getById(this.courseId)
      .pipe(map((course) => (this.course = course)))
      .pipe(
        switchMap((course) =>
          this.roomService.getRoomById(course!.roomId).pipe(
            take(1),
            map((room) => (this.room = room))
          )
        )
      )
      .pipe(
        switchMap((room) =>
          this.teachersCoursesService
            .getUsersByGrade(room.grade.toString())
            .pipe(
              map((students) => {
                this.formGrades = this.fb.group({
                  scores: this.fb.array(
                    students.map((student) => this.setScore(student))
                  ),
                });
                return students;
              })
            )
        )
      );
    /* this.updateView(); */
  }
  setScore(student: any): FormGroup {
    return this.fb.group({
      studentId: [student.id],
      studentName: [student.name.fullName],
      courseName: [this.course!.name],
      unit1: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).unit1,
      ],
      unit2: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).unit2,
      ],
      unit3: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).unit3,
      ],
      notes1: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).notes1,
      ],
      notes2: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).notes2,
      ],
      notes3: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).notes3,
      ],
      recover1: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).recover1,
      ],
      recover2: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).recover2,
      ],
      recover3: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).recover3,
      ],
      final: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).final,
      ],
      isCourseClosed: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).isCourseClosed,
      ],
    });
  }

  get scores(): FormArray {
    return this.formGrades.get('scores') as FormArray;
  }

  finalGrades(arrayItem: any) {
    let partialUser: Partial<User> = {};
    let score: Partial<Score> = {};
    let studentProps: any = {};
    arrayItem['_forEachChild']((control: any, name: any) => {
      if (name == 'studentId' || name == 'studentName') {
        studentProps[name] = control.value;
      } else {
        //score[name] = control.value;
      }
    });
    if (score.isCourseClosed)
      score.prom_materia =
        +Math.trunc((+(score.unit1! + score.unit2 + score.unit3) * 10) / 3) /
        10;
    this.teachersCoursesService
      .getUser(studentProps['studentId'])
      .pipe(
        map((user) => {
          let pos: number | undefined = user?.currentGrades!.scores.findIndex(
            (s: any) => s.courseName == score['courseName']
          );
          const scores: Score[] = [];
          scores.push(...user!.currentGrades!.scores);
          scores.splice(pos!, 1, { ...(score as Score) });
          partialUser = {
            id: user?.id,
            displayName: studentProps['studentName'],
            /* currentGrades: {
              isFinished: user?.currentGrades!.scores.every(
                (s: any) => s.final != null && s.isCourseClosed == true
              ),
              scores: [],
              //notes: user.currentGrades.notes
            }, */
          };
          partialUser.currentGrades!.scores.push(...scores);
          return partialUser;
        })
      )
      .subscribe((user) => {
        this.teachersCoursesService.updateUser(user.id!, user);
      });
  }
  onChange() {
    this.currentGrades.get('');
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
