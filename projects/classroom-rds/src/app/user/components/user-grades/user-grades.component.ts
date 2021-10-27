import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

import { select, Store } from '@ngrx/store';

import { AppState } from '@rds-store/app.state';

import { User } from '@rds-auth/models/user.model';

import { SubscriptionService } from '@rds-shared/services';


import { UserEntityService } from '@rds-store/user/user-entity.service';

import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { from, Observable, Subscription } from 'rxjs';

import { isTeacher, selectUser } from '@rds-auth/state/auth.selectors';
import { ScoreService } from '@rds-root/app/teachers/services/score.service';

@Component({
  selector: 'app-user-grades',
  templateUrl: './user-grades.component.html',
  styleUrls: ['./user-grades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGradesComponent implements OnInit, OnDestroy {
  @ViewChild('htmlData') htmlData: ElementRef;
  user$: Observable<User>;
  isTeacher$: Observable<boolean>;
  loading$: Observable<boolean>;
  userId: string;
  userName: string;
  userSub: Subscription;
  today: Date = new Date();
  faPrint = faPrint;
  faFilePdf = faFilePdf;
  selectedCicle = { id: '20202021', cicle: '2020-2021' };
  user: User;
  constructor(
    private userEntityService: UserEntityService,
    private router: ActivatedRoute,
    private scoreService: ScoreService,
    private store: Store<AppState>,
    private subService: SubscriptionService
  ) {
    this.loading$ = this.userEntityService.loading$;
    this.isTeacher$ = this.store.pipe(select(isTeacher));
  }
  ngOnInit(): void {
    this.user$ = this.store.select(selectUser).pipe(
      tap(user => this.user = user),
      mergeMap(user => this.scoreService.getUserScores(user.id, this.selectedCicle.cicle)
        .then(
          grade => { return { ...this.user, currentGrades: grade } as User })
      ),
      tap(user => console.log(user)),
    )
  }
  printPage() {
    window.print();
  }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
}
