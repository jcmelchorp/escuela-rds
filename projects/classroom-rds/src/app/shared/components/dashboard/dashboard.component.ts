import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@rds-store/app.state';
import * as fromAuthActions from '@rds-auth/state/auth.actions';
import { Observable } from 'rxjs';
import { User } from '@rds-auth/models/user.model';
import { isLoggedIn, isTeacher, isAdmin } from '@rds-auth/state/auth.selectors';
import { fadeInAnimation } from '@rds-shared/animations/fade-in.animation';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation], //[@fadeIn]="'fadeIn'"
})
export class DashboardComponent implements OnInit {
  //user$: Observable<User>;
  @Input() user: User;
  isTeacher$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isOnline$: Observable<boolean>;

  cards: any[];
  raisedElev: number = 12;
  constructor(private store: Store<AppState>) {
    this.isOnline$ = this.store.select(isLoggedIn);
    this.isTeacher$ = this.store.select(isTeacher);
    this.isAdmin$ = this.store.select(isAdmin);
    this.cards = [
      {
        title: 'Alumnos',
        description: 'Accede a toda tu información como alumno.',
        route: 'user',
        imgUrl: 'assets/images/assignment-grades2.png',
        access: this.isOnline$,
      },
      {
        title: 'Profesores',
        description: 'Acceso a las funciones docentes.',
        route: 'profesores',
        imgUrl: 'assets/images/dashboard-image2.png',
        access: this.isTeacher$ || this.isAdmin$,
      },
      {
        title: 'Directivos',
        description: 'Administra usuarios en la institución.',
        route: 'escuela',
        imgUrl: 'assets/images/dashboard-image.png',
        access: this.isAdmin$,
      },
      {
        title: 'Funciones de G Suite',
        description: 'Administra Google Classroom y Google Admin Directory.',
        route: 'gsuite',
        imgUrl: 'assets/images/dashboard-google.png',
        access: this.isTeacher$ || this.isAdmin$,
      },
    ];
  }
  ngOnInit(): void {
    /* this.cards = [
      {
        title: 'Servicios Escolares',
        description: 'Accede a toda tu información como alumno.',
        route: 'user',
        imgUrl: 'assets/images/assignment-grades2.png',
        access: true
      },
      {
        title: 'Servicios Docentes',
        description: 'Acceso a las funciones docentes.',
        route: 'profesores',
        imgUrl: 'assets/images/dashboard-image2.png',
        access: (this.isTeacher || this.isAdmin)
      },
      {
        title: 'Administración Escolar',
        description: 'Administra usuarios en la institución.',
        route: 'escuela',
        imgUrl: 'assets/images/dashboard-image.png',
        access: (this.isTeacher || this.isAdmin)
      },
      {
        title: 'Funciones de G Suite',
        description: 'Administra Google Classroom y Google Admin Directory.',
        route: 'gsuite',
        imgUrl: 'assets/images/dashboard-google.png',
        access: (this.isTeacher || this.isAdmin)
      }
    ]; */
  }

  optionsByRole(userId: string) {
    this.store.dispatch(fromAuthActions.checkTeacherRole({ id: userId }));
  }
}
