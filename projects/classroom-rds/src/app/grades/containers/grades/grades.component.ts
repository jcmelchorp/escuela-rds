import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faPlus,
  faUserPlus,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { QueryParams } from '@ngrx/data';
import * as fromAuthSelectors from '@rds-auth/state/auth.selectors';
import { AppState } from '@rds-store/app.state';
import { User } from '@rds-auth/models/user.model';
import { CourseEntityService } from '@rds-store/course/course-entity.service';
import { CourseState } from '@rds-classroom/models/classroom.enum';
import { AnnouncementsService } from '@rds-classroom/announcements/services/announcements.service';
import { AnnouncementDialogComponent } from '@rds-classroom/announcements/components/announcement-dialog/announcement-dialog.component';
import { CourseDialogComponent } from '@rds-classroom/courses/components/course-dialog/course-dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseRoles } from '../../models/student-grade.model';
import { CourseUserDialogComponent } from '@rds-classroom/courses/components/course-user-dialog/course-user-dialog.component';
import { CoursesService } from '@rds-classroom/courses/services/courses.service';
import { UserProfilesService } from '@rds-classroom/user-profiles/services/user-profiles.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesComponent implements OnInit {
  user$: Observable<User>;
  userProfile$: Observable<gapi.client.classroom.UserProfile>;
  courses$: Observable<gapi.client.classroom.Course[]>;
  coursesAsStudent$: Observable<gapi.client.classroom.Course[]>;
  coursesAsTeacher$: Observable<gapi.client.classroom.Course[]>;

  selectRoleForm: FormGroup;
  keys;
  roles: CourseRoles;
  eStates = CourseState;
  states: string[];
  isLoaded$: Observable<boolean>;
  userId: string;
  isOnline$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isTeacher$: Observable<boolean>;
  loading$: Observable<boolean>;
  faPlus = faPlus;
  faUserPlus = faUserPlus;
  faBullhorn = faBullhorn;
  queryParams: QueryParams;
  constructor(
    private courseEntityService: CourseEntityService,
    private coursesService: CoursesService,
    private userProfilesService: UserProfilesService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private announcementsService: AnnouncementsService,
    private formBuilder: FormBuilder
  ) {
    this.keys = Object.keys(this.eStates).filter(Number);
    this.isOnline$ = this.store.pipe(select(fromAuthSelectors.isLoggedIn));
    this.store
      .pipe(select(fromAuthSelectors.selectUser))
      .subscribe((user) => (this.userId = user.id));
    this.isAdmin$ = this.store.pipe(select(fromAuthSelectors.isAdmin));
    this.isTeacher$ = this.store.pipe(select(fromAuthSelectors.isTeacher));
    this.initializeForm();
    this.queryParams = {};
    this.loading$ = this.courseEntityService.loading$;
    this.courses$ = this.courseEntityService.entities$.pipe(
      map((courses) => {
        if (!courses) {
          this.courseEntityService.getWithQuery(this.queryParams);
        }
        return courses
          .filter((x) => x.ownerId == this.userId)
          .filter((y) => y.courseState == 'ACTIVE');
      })
    );
    this.onChangeSelection();
  }

  ngOnInit(): void {
    this.coursesAsStudent$ = this.courseEntityService.getWithQuery({
      studentId: this.userId,
      courseStates: 'ACTIVE',
    });
  }

  initializeForm() {
    this.selectRoleForm = this.formBuilder.group({
      selectedRole: new FormControl('OWNER', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      selectedStates: new FormControl(['ACTIVE'], {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });
  }

  onChangeSelection() {
    this.states = this.selectRoleForm.get('selectedStates').value;
    this.selectRoleForm.get('selectedRole').valueChanges.subscribe((role) => {
      if (role == 'ADMIN') {
        this.loading$ = this.courseEntityService.loading$;
        this.queryParams = { courseStates: this.states };
        this.courses$ = this.courseEntityService.entities$.pipe(
          map((courses) => {
            if (!courses) {
              this.courseEntityService.getWithQuery(this.queryParams);
            }
            return courses;
          })
        );
      } else if (role == 'OWNER') {
        this.loading$ = this.courseEntityService.loading$;
        this.queryParams = {
          teacherId: this.userId,
          courseStates: this.states,
        };
        this.courses$ = this.courseEntityService.entities$.pipe(
          map((courses) => {
            if (!courses) {
              this.courseEntityService.getWithQuery(this.queryParams);
            }
            return courses.filter((x) => x.ownerId == this.userId);
          })
        );
        console.log(this.states);
        console.log(role);
      } else if (role == 'TEACHER') {
        this.loading$ = this.courseEntityService.loading$;
        this.queryParams = {
          teacherId: this.userId,
          courseStates: this.states,
        };
        this.coursesAsTeacher$ = this.courseEntityService.getWithQuery(
          this.queryParams
        );
        this.courses$ = this.coursesAsTeacher$;
      } else if (role == 'STUDENT') {
        this.loading$ = this.courseEntityService.loading$;
        this.queryParams = {
          studentId: this.userId,
          courseStates: this.states,
        };
        this.coursesAsStudent$ = this.courseEntityService.getWithQuery(
          this.queryParams
        );
        this.courses$ = this.coursesAsStudent$;
      }
    });
  }

  openCreateCourseDialog() {
    let course: gapi.client.classroom.Course = {};
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      minWidth: '450px',
      minHeight: '550px',
      data: { course, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseEntityService.add(result.course, { isOptimistic: false });
      }
    });
  }

  openCreateAnnouncementDialog() {
    const newAnnouncement: gapi.client.classroom.Announcement = {
      text: '',
      materials: [],
      state: 'DRAFT',
      assigneeMode: 'ALL_STUDENTS',
    };
    const dialogRef = this.dialog.open(AnnouncementDialogComponent, {
      minWidth: '450px',
      data: { newAnnouncement, isNew: true, section: '' },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.courseEntityService.keys$.subscribe((courseIds: string[]) => {
          courseIds.map(async (courseId: string) => {
            const response = await this.announcementsService.createAnnouncement(
              result.newAnnouncement as gapi.client.classroom.Announcement,
              courseId
            );
          });
        });
      }
    });
  }
  openAddUserDialog() {
    const dialogRef = this.dialog.open(CourseUserDialogComponent, {
      width: '450px',
      data: { courses: this.courses$, mail: 'me', isTeacher: false },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const profile = await this.userProfilesService.getUserProfile(
          result.mail
        );
        const preTeacher: gapi.client.classroom.Invitation = {
          userId: result.mail,
          courseId: result.id,
          role: result.isTeacher ? 'TEACHER' : 'STUDENT',
        };
        this.coursesService
          .createInvitation(preTeacher)
          .then((success) =>
            console.log(
              'invitation successfully created for ' +
                profile.name.givenName +
                ' as ' +
                success.role
            )
          );
        //const newTeacher = this.teacherEntityService.add(preTeacher)
        //const newTeacher = this.teachersService.addTeacher(result.id, result.mail)
        //this.teacherEntityService.add(teacher);
      }
    });
  }
}
