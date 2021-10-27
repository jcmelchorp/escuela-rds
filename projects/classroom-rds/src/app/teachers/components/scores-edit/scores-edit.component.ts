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
import { SubscriptionService } from '@rds-shared/services/subscription.service';
import { User } from '@rds-auth/models/user.model';
import { Room } from '@rds-rooms/models/room.model';
import { RoomService } from '@rds-rooms/services/room.service';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { Score } from '@rds-user/models/grade.model';
import { CourseEntityService } from '@rds-store/course/course-entity.service';
import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';
import { ScoreService } from '../../services/score.service';

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
  students$!: Observable<User[]>;
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
    private scoreService: ScoreService,
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
        this.roomService.getRoomByGrade(course.grade.toString(), this.selectedCicle.id).pipe(
          map((room) => {
            this.room = room;
            this.currentGrades = this.formBuilder.group({
              scores: this.formBuilder.array(
                room.students.map((student) => this.setScore(student))
              ),
            });
            return room.students;
          })
        )
      )
    )
  }

  async setScore(student: any): Promise<FormGroup> {
    const currentGrades = await this.scoreService.getUserScores(student.id, this.selectedCicle.id)
    return this.formBuilder.group({
      studentId: [student.id, [Validators.required]],
      studentName: [student.name.fullName, Validators.required],
      courseName: [this.course.name, [Validators.required]],
      unit1: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: Score) => s.courseName == this.course.name
          ).unit1
          : '',
      ],
      unit2: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: Score) => s.courseName == this.course.name
          ).unit2
          : '',
      ],
      unit3: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: Score) => s.courseName == this.course.name
          ).unit3
          : '',
      ],
      notes1: [
        currentGrades.scores.find(
          (s: Score) => s.courseName == this.course!.name
        ).notes1,
      ],
      notes2: [
        currentGrades.scores.find(
          (s: Score) => s.courseName == this.course.name
        ).notes2,
      ],
      notes3: [
        currentGrades.scores.find(
          (s: Score) => s.courseName == this.course.name
        ).notes3,
      ],
      recover1: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: Score) => s.courseName == this.course.name
          ).recover1
          : '',
      ],
      recover2: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: Score) => s.courseName == this.course.name
          ).recover2
          : '',
      ],
      recover3: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: Score) => s.courseName == this.course.name
          ).recover3
          : '',
      ],
      prom_materia: [
        !this.isKinder
          ? currentGrades.scores.find(
            (s: Score) => s.courseName == this.course.name
          ).prom_materia
          : '',
      ],
      isCourseClosed: [
        currentGrades.scores.find(
          (s: Score) => s.courseName == this.course.name
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

  async finalGrades(arrayItem: any) {
    this.publishing$.next(true);
    let partialUser: Partial<User> = {};
    const scores: Score[] = [];
    let score: Partial<Score> = {};
    let studentProps: any = {};
    arrayItem['_forEachChild']((control: any, name: any) => {
      if (name == 'studentId' || name == 'studentName') {
        studentProps[name] = control.value;
      } else {
        score[name] = control.value;
      }
    });
    //this.scoreService.setUserScores({
    //   cicleId: this.selectedCicle.id,
    //  grade: this.course.grade,
    //  isFinished?: (score.unit1 && score.unit2 && score.unit3 && score.prom_materia && score.isCourseClosed),
    //  prom_final?: (score.unit1 && score.unit2 && score.unit3 && score.prom_materia && score.isCourseClosed) ?
    //  +Math.trunc((+(score.unit1! + score.unit2 + score.unit3) * 10) / 3) /
    //    10; : null,;
    // scores: Score[];
    // userId: studentProps['studentId']
    // });
    /* if (score.isCourseClosed)
      score.prom_materia =
        +Math.trunc((+(score.unit1! + score.unit2 + score.unit3) * 10) / 3) /
        10; */
    const currentGrades = await this.scoreService.getUserScores(studentProps.studentId, this.selectedCicle.id)
    let pos: number = currentGrades.scores.findIndex(
      (s) => s.courseName == score.courseName
    );
    scores.push(...currentGrades.scores);
    scores.splice(pos, 1, { ...(score as Score) });
    let isFinished = (scores && scores.every((s) => s.isCourseClosed && s.prom_materia));
    let prom_final = isFinished ?
      scores.map((s) => s.prom_materia).reduce((a, b) => (a + b)) / scores.length : null;
    this.scoreService.setUserScores({
      cicleId: this.selectedCicle.id,
      grade: this.course.grade,
      isFinished: isFinished,
      prom_final: prom_final,
      scores: scores,
      userId: studentProps.studentId,
    });
    /* this.teachersCourses
      .getUser(studentProps.studentId)
      .pipe(
        map((user) => {
          let pos: number | undefined = currentGrades.scores.findIndex(
            (s) => s.courseName == score.courseName
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
      }); */
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$; //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
