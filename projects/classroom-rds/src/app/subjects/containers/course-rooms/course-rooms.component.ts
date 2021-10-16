import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

import { SchoolLevel } from '@rds-auth/models/user.enum';

import { Room, RoomState } from '@rds-rooms/models/room.model';

import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';
import { UserEntityService } from '@rds-store/user/user-entity.service';

import { moveIn } from '@rds-shared/animations/router.animations';

import { User } from '@rds-auth/models/user.model';

import { RoomService } from '@rds-rooms/services/room.service';

import { Observable, of, Subject, Subscription } from 'rxjs';
import {
  concatMap,
  exhaust,
  exhaustMap,
  map,
  switchMap,
  take,
  mergeMap,
  tap,
} from 'rxjs/operators';

import { SubjectDialogComponent } from '../../components';
import { CourseRoom, CourseType } from '../../models/course-room.model';
@Component({
  selector: 'app-course-rooms',
  templateUrl: './course-rooms.component.html',
  styleUrls: ['./course-rooms.component.scss'],
  animations: [moveIn()],
})
export class CourseRoomsComponent implements OnInit {
  courseRooms: CourseRoom[];
  coursesSubscription: Subscription;
  teachers$: Observable<User[]>;
  loading_users$: Observable<boolean>;
  loaded_users$: Observable<boolean>;
  loading_courses$: Observable<boolean>;
  loaded_courses$: Observable<boolean>;
  newClass$: Observable<CourseRoom>;
  roomFirestore: Observable<Room>;
  courseRoomsSub: Subject<CourseRoom> = new Subject<CourseRoom>();
  slevelKeys;
  slevels = SchoolLevel;
  states = RoomState;
  faChalkboardTeacher = faChalkboardTeacher;
  searchForm: FormGroup;
  courses$: Observable<CourseRoom[]>;
  coursesByGrade$: Observable<CourseRoom[]>[];
  periods$: Observable<string[]>;
  resCount: number;
  selected = '20202021';
  constructor(
    private fb: FormBuilder,
    private courseRoomES: CourseRoomEntityService,
    private userEntityService: UserEntityService,
    private roomService: RoomService,
    private dialog: MatDialog
  ) {
    this.initSearchForm();
    this.periods$ = this.roomService.getPeriods();
    this.loaded_courses$ = this.courseRoomES.loaded$;
    this.loaded_users$ = this.userEntityService.loaded$;
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
    this.teachers$ = this.userEntityService.entities$.pipe(
      map((users) => users.filter((u) => u.isTeacher == true))
    );
  }

  ngOnInit() {
    this.onSearch(this.selected);
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      name: new FormControl(''),
      mainTeacherId: new FormControl('', Validators.required),
      selectedCicle: new FormControl(this.selected, Validators.required),
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
  onSearch(period?: string) {
    let name: string = (this.name.value as string).toLocaleLowerCase();
    let selectedCicle: string = period;
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

  openCourseRoomDialog(course?: CourseRoom) {
    let cicle: string = this.selectedCicle.value as string;
    const newCourse: CourseRoom = {
      id: '',
      priority: null,
      name: '',
      roomId: '',
      mainTeacherId: '',
      description: '',
      cicle: cicle,
      courseType: CourseType.formativo,
      secondaryTeachersId: [],
    };
    const dialogRef = this.dialog.open(SubjectDialogComponent, {
      width: 'fit-content',
      minWidth: '400px',
      height: 'fit-content',
      data: course
        ? { course, isNew: true }
        : { course: newCourse, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          const newCourses: CourseRoom[] = [];

          this.roomService
            .getRoomById(result.course.roomId, result.course.cicle)
            .pipe(
              take(1),
              switchMap((room) =>
                this.courseRoomES
                  .add(
                    { ...result.course, priority: room.courses.length },
                    { isOptimistic: false }
                  )
                  .pipe(
                    map((course) => {
                      newCourses.push(...room.courses);
                      newCourses.push({
                        ...course,
                        priority: room.courses.length,
                      });
                      return newCourses;
                    })
                  )
              )
            )
            .subscribe((courses) =>
              this.roomService.updateCourses(
                result.course.roomId,
                cicle,
                courses
              )
            );
        }
      } else {
      }
    });
  }

  handleCourseDelete(course: CourseRoom) {
    this.courseRoomES.delete(course);
  }
  copyCourses() {
    const cicle = this.selectedCicle.value as string;
    this.courses$.subscribe(courses => {
      courses.forEach((course) =>
        this.courseRoomES.add({
          cicle: '20212022',
          grade: course.grade,
          id: '',
          roomId: '',
          mainTeacherId: course.mainTeacherId,
          priority: course.priority,
          name: course.name,
          description: course.description,
          courseType: course.courseType,
        })
      );
    });
  }
}
