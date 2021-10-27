import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { User } from '@rds-auth/models/user.model';
import { AppState } from '@rds-store/app.state';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TeachersCoursesService } from '../../services/teachers-courses.service';
import { moveInLeft } from '@rds-shared/animations/router.animations';
import { CourseRoom } from '@rds-root/app/subjects/models/course-room.model';
import { RoomService } from '@rds-root/app/rooms/services/room.service';
import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';
import { defaultPeriod, selectConfigState } from '@rds-core/state/core.selectors';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.scss'],
  animations: [moveInLeft()],
})
export class TeacherCoursesComponent implements OnInit {
  courses$!: Observable<CourseRoom[]>;
  isAdmin$!: Observable<boolean>;
  currentTeacher!: User;
  teachers$: Observable<User[]>;
  searchForm!: FormGroup;
  teacherSubscription: Subscription;
  selectedCicle: Observable<{ id: string, cicle: string }>;
  loading_courses$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private teachersCoursesService: TeachersCoursesService,
    private courseRoomES: CourseRoomEntityService,
    private roomService: RoomService
  ) {
    this.loading_courses$ = this.courseRoomES.loading$;
    this.initSearchForm();
    this.selectedCicle = this.store.pipe(select(defaultPeriod));
    this.teacherSubscription = this.store
      .select(selectUser)
      .subscribe((user) => {
        this.currentTeacher = user;
        this.searchForm.patchValue({
          mainTeacherId: user.id,
        });
        return user;
      });
    this.teachers$ = this.teachersCoursesService.getTeachers();
  }

  ngOnInit(): void {
    this.onSearch();
  }

  get searchString() {
    return this.searchForm.get('searchString');
  }
  get mainTeacherId() {
    return this.searchForm.get('mainTeacherId');
  }

  onSearch() {
    let name: string = this.searchString.value.toLocaleLowerCase();
    let mainTeacherId: string = this.mainTeacherId.value;
    this.courses$ = this.courseRoomES.entities$.pipe(
      map((courses) => {
        if (!courses) {
          this.courseRoomES.getWithQuery({
            field: 'mainTeacherId',
            operation: '==',
            value: mainTeacherId,
          });
        }
        if (name == '' && mainTeacherId == '') return courses;
        if (name == '')
          return courses.filter((c) => c.mainTeacherId == mainTeacherId);
        if (mainTeacherId == '')
          return courses.filter((c) =>
            c.name.toLocaleLowerCase().includes(name)
          );

        return courses.filter(
          (c) =>
            c.name.toLocaleLowerCase().includes(name) &&
            c.mainTeacherId == mainTeacherId
        );
      }),
      /* switchMap((courses) =>
        this.roomService.getRoomsOnCicle(this.selectedCicle.id).pipe(
          map((rooms) =>
            courses.map((course) => {
              //const room = rooms.find((r) => r.id == course.roomId);
              return { ...course, grade: course.grade };
            })
          )
        )
      ), */
      switchMap((courses) =>
        this.teachers$.pipe(
          map((users) =>
            courses.map((course) => {
              const teacher = users.find((u) => u.id == course.mainTeacherId);
              return { ...course, mainTeacher: teacher };
            })
          )
        )
      )
    );
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      searchString: new FormControl(''),
      mainTeacherId: new FormControl('', Validators.required),
    });
  }
  ngOnDestroy(): void {
    this.teacherSubscription.unsubscribe();
  }
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
