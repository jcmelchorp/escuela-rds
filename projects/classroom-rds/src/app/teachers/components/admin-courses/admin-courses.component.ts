import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, switchMap, concatMap, tap } from 'rxjs/operators';

import { SchoolService } from '@rds-school/services/school.service';

import { AppState } from '@rds-store/app.state';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { RoomService } from '@rds-rooms/services/room.service';
import { moveIn } from '@rds-shared/animations/router.animations';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { TeachersCoursesService } from '../../services/teachers-courses.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss'],
  animations: [moveIn()],
})
export class AdminCoursesComponent implements OnInit, OnDestroy {
  courses$!: Observable<CourseRoom[]>;
  searchedCourses$!: Observable<CourseRoom[]>;
  teachers$: Observable<User[]>;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  userId!: string;
  slevelKeys;
  slevels = SchoolLevel;
  searchForm!: FormGroup;
  formSubscription!: Subscription;
  periods$: Observable<string[]>;
  selectedCicle = '20202021';
  constructor(
    private teachersCourses: TeachersCoursesService,
    private schoolService: SchoolService,
    private roomService: RoomService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.periods$ = this.roomService.getPeriods();
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
    this.store.select(selectUser).subscribe((user) => (this.userId = user.id));
    this.initSearchForm();
    this.teachers$ = this.schoolService
      .getUsers()
      .pipe(
        map((users) =>
          users
            .filter((u) => u.isTeacher == true)
            .sort((a, b) =>
              compare(a.name?.familyName!, b.name?.familyName!, true)
            )
        )
      );
  }
  get cicle() {
    return this.searchForm.get('cicle');
  }
  get grade() {
    return this.searchForm.get('grade');
  }
  get mainTeacherId() {
    return this.searchForm.get('mainTeacherId');
  }
  ngOnInit(): void {
    let cicle: string = this.cicle?.value as string;
    this.courses$ = this.teachersCourses.getAllCourses().pipe(
      mergeMap((courses) =>
        this.roomService.getRoomsOnCicle(cicle).pipe(
          map((rooms) =>
            courses.map((course) => {
              const room = rooms.find((r) => r.id == course.roomId);
              return { ...course, grade: room!.grade };
            })
          )
        )
      ),
      map((courses) =>
        courses.map((course) => {
          let teacher;
          this.teachersCourses
            .getUser(course.mainTeacherId)
            .subscribe((user) => (teacher = user));
          return { ...course, mainTeacher: teacher };
        })
      )
    );
    this.searchedCourses$ = this.courses$;
  }
  initSearchForm() {
    this.searchForm = this.fb.group({
      grade: new FormControl(),
      mainTeacherId: new FormControl(),
      clcle: new FormControl(),
    });
    this.searchForm.patchValue({
      grade: '',
      mainTeacherId: '',
      clcle: this.selectedCicle,
    });
  }

  onSearch() {
    let cicle: string = this.cicle?.value as string;
    this.searchedCourses$ = this.teachersCourses.getAllCourses().pipe(
      map((courses) => {
        if (this.grade?.value == '' && this.mainTeacherId?.value == '')
          return courses;
        if (this.grade?.value == '')
          return courses.filter(
            (s) => s.mainTeacherId == this.mainTeacherId?.value
          );
        if (this.mainTeacherId?.value == '')
          return courses.filter(
            (s) => s.grade?.toString() == this.grade?.value
          );
        return [];
      }),
      switchMap((courses) =>
        this.roomService.getRoomsOnCicle(cicle).pipe(
          map((rooms) =>
            courses.map((course) => {
              const room = rooms.find((r) => r.id == course.roomId);
              return { ...course, grade: room?.grade };
            })
          )
        )
      ),
      map((courses) =>
        courses.map((course) => {
          let teacher;
          this.teachersCourses
            .getUser(course.mainTeacherId)
            .subscribe((user) => (teacher = user));
          return { ...course, mainTeacher: teacher };
        })
      )
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
