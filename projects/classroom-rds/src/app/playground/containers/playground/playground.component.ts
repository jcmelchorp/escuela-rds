import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@rds-auth/models/user.model';
import { RoomService } from '@rds-rooms/services/room.service';
import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  resCount: number;
  teachers$: Observable<User[]>;
  courses$: Observable<CourseRoom[]>;
  loading_users$: Observable<boolean>;
  loaded_users$: Observable<boolean>;
  loading_courses$: Observable<boolean>;
  loaded_courses$: Observable<boolean>;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseRoomES: CourseRoomEntityService,
    private userEntityService: UserEntityService,
    private roomService: RoomService,

  ) {
    this.loaded_courses$ = this.courseRoomES.loaded$;
    this.loaded_users$ = this.userEntityService.loaded$;
  }
  initSearchForm() {
    this.searchForm = this.fb.group({
      name: new FormControl(''),
      mainTeacherId: new FormControl('', Validators.required),
      selectedCicle: new FormControl('', Validators.required),
    });
  }
  get selectedCicle() {
    return this.searchForm.get('selectedCicle');
  }
  get name() {
    return this.searchForm.get('name');
  }
  get mainTeacherId() {
    return this.searchForm.get('mainTeacherId');
  }
  ngOnInit(): void {
    this.onFetchCourses();
  }

  onFetchCourses() {
    let name: string = (this.name.value as string).toLocaleLowerCase();
    let selectedCicle: string = this.name.value as string;
    let mainTeacherId: string = this.mainTeacherId.value as string;
    this.courses$ = this.courseRoomES.entities$.pipe(
      map((courses) => {
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
      switchMap((courses) =>
        this.roomService.getRoomsOnCicle(selectedCicle).pipe(
          map((rooms) =>
            courses.map((course) => {
              const room = rooms.find((r) => r.id == course.roomId);
              return {
                ...course,
                grade: room.grade,
              } as CourseRoom;
            })
          )
        )
      ),
      switchMap((courses) =>
        this.teachers$.pipe(
          map((users) =>
            courses.map((course) => {
              const teacher = users.find((u) => u.id == course.mainTeacherId);
              return { ...course, mainTeacher: teacher };
            })
          )
        )
      ),
      tap((courses) => (this.resCount = courses.length))
    );
  }
}
