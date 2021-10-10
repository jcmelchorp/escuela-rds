import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faChevronLeft,
  faUserClock,
  faUserTag,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, from, Observable, merge } from 'rxjs';
import {
  map,
  switchMap,
  take,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { TeachersCoursesService } from './../../services/teachers-courses.service';
import { SubscriptionService } from './../../../shared/services/subscription.service';
import { User } from '@rds-auth/models/user.model';
import { Room } from '@rds-rooms/models/room.model';
import { RoomService } from '@rds-rooms/services/room.service';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { Score } from '@rds-user/models/grade.model';
import { CourseEntityService } from '../../../store/course/course-entity.service';
import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-scores-edit',
  templateUrl: './scores-edit.component.html',
  styleUrls: ['./scores-edit.component.scss'],
})
export class ScoresEditComponent implements OnInit, OnDestroy {
  courseId: string;
  grade: string;
  isKinder: boolean;
  suspended!: boolean;
  room!: Room;
  course: CourseRoom | undefined = undefined;
  course$!: Observable<CourseRoom>;
  students$!: Observable<Partial<User>[]>;
  faChevronLeft = faChevronLeft;
  faUserClock = faUserClock;
  faUserTag = faUserTag;
  selectedCicle = { id: '20202021', cicle: '2020-2021' };
  publishing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  currentGrades!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private teachersCourses: TeachersCoursesService,
    private courseRoomES: CourseRoomEntityService,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService
  ) {
    this.loaded$ = this.courseRoomES.loaded$;
    this.loading$ = this.courseRoomES.loading$;
    this.courseId = this.route.snapshot.params.courseId;
    this.grade = this.route.snapshot.queryParams.grade;
    this.isKinder = this.grade.endsWith('Preescolar');
    this.publishing$.next(false);
  }

  ngOnInit(): void {
    this.students$ = this.courseRoomES.entities$.pipe(
      map((cc: CourseRoom[]) => cc.find((c) => c.id === this.courseId)),
      tap((course) => {
        this.course = course;
      }),
      mergeMap((course) =>
        this.roomService.getRoomById(course!.roomId, course!.cicle).pipe(
          tap((room) => {
            this.room = room;
          })
        )
      ),
      switchMap((room) =>
        this.roomService.getStudents(room.grade.toString(), room.cicle).pipe(
          map((students) => {
            this.currentGrades = this.formBuilder.group({
              scores: this.formBuilder.array(
                students.map((student) => this.setScore(student))
              ),
            });
            return students;
          })
        )
      )
    );
  }

  setScore(student: any): FormGroup {
    return this.formBuilder.group({
      studentId: [student.id, [Validators.required]],
      studentName: [student.name.fullName, Validators.required],
      courseName: [this.course!.name, [Validators.required]],
      unit1: [
        !this.isKinder
          ? student.currentGrades.scores.find(
              (s: any) => s.courseName == this.course!.name
            ).unit1
          : '',
      ],
      unit2: [
        !this.isKinder
          ? student.currentGrades.scores.find(
              (s: any) => s.courseName == this.course!.name
            ).unit2
          : '',
      ],
      unit3: [
        !this.isKinder
          ? student.currentGrades.scores.find(
              (s: any) => s.courseName == this.course!.name
            ).unit3
          : '',
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
        !this.isKinder
          ? student.currentGrades.scores.find(
              (s: any) => s.courseName == this.course!.name
            ).recover1
          : '',
      ],
      recover2: [
        !this.isKinder
          ? student.currentGrades.scores.find(
              (s: any) => s.courseName == this.course!.name
            ).recover2
          : '',
      ],
      recover3: [
        !this.isKinder
          ? student.currentGrades.scores.find(
              (s: any) => s.courseName == this.course!.name
            ).recover3
          : '',
      ],
      final: [
        !this.isKinder
          ? student.currentGrades.scores.find(
              (s: any) => s.courseName == this.course!.name
            ).final
          : '',
      ],
      isCourseClosed: [
        student.currentGrades.scores.find(
          (s: any) => s.courseName == this.course!.name
        ).isCourseClosed,
      ],
    });
  }

  /* publishGrades(arrayItem) {
    let score: Partial<Score> = {};
    let studentProps: any = {};
    arrayItem['_forEachChild']((control, name) => {
      if (name == 'studentId' || name == 'studentName') {
        studentProps[name] = control.value;
      } else {
        score[name] = control.value;
      }
    });
    console.log(score)

    this.userEntityService.entities$.pipe(map(users => {
      let user: User = users.find(u => u.id == studentProps['studentId']);
      let pos: number = user.currentGrades.scores.findIndex(s => s.courseName == score['courseName']);
      //console.log(pos)
      user.currentGrades.scores.splice(pos, 1, ...[{ ...score as Score }])
      let partialUser: Partial<User> = {
        currentGrades: {
          scores: user.currentGrades.scores,
        }
      }
      //partialUser.currentGrades.scores
      //console.log(partialUser)
      return partialUser as User
    })
    ).subscribe((user) => console.log(user))
    //this.userEntityService.update(postUser);
  } */

  finalGrades(arrayItem: any) {
    this.publishing$.next(true);
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
      score.final =
        +Math.trunc((+(score.unit1! + score.unit2 + score.unit3) * 10) / 3) /
        10;
    this.teachersCourses
      .getUser(studentProps['studentId'])
      .pipe(
        map((user) => {
          let pos: number | undefined = user.currentGrades?.scores.findIndex(
            (s) => s.courseName == score['courseName']
          );
          const scores: Score[] = [];
          scores.push(...user.currentGrades!.scores);
          scores.splice(pos!, 1, { ...(score as Score) });
          partialUser = {
            id: user.id,
            displayName: studentProps['studentName'],
            currentGrades: {
              isFinished: user.currentGrades!.scores.every(
                (s) => s.final != null && s.isCourseClosed == true
              ),
              scores: [],
              //notes: user.currentGrades.notes
            },
          };
          partialUser.currentGrades!.scores.push(...scores);
          return partialUser;
        })
      )
      .subscribe((user) => {
        this.teachersCourses.updateUser(user.id!, user);
        this.publishing$.next(false);
      });
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$; //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
