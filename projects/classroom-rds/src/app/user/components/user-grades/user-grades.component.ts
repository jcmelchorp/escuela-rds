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

import { isTeacher } from '@rds-auth/state/auth.selectors';

import { UserEntityService } from '@rds-store/user/user-entity.service';

import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { selectUser } from './../../../auth/state/auth.selectors';

@Component({
  selector: 'app-user-grades',
  templateUrl: './user-grades.component.html',
  styleUrls: ['./user-grades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGradesComponent implements OnInit, OnDestroy {
  @ViewChild('htmlData') htmlData: ElementRef | undefined;
  user$: Observable<User> | undefined;
  isTeacher$: Observable<boolean>;
  loading$: Observable<boolean>;
  userId: string | undefined;
  userName: string | undefined;
  userSub: Subscription | undefined;
  today: Date = new Date();
  faPrint = faPrint;
  faFilePdf = faFilePdf;

  constructor(
    private userEntityService: UserEntityService,
    private router: ActivatedRoute,
    private store: Store<AppState>,
    private subService: SubscriptionService
  ) {
    this.loading$ = this.userEntityService.loading$;
    this.isTeacher$ = this.store.pipe(select(isTeacher));
  }
  ngOnInit(): void {
    /*  this.user$ = this.store.select(selectUser).pipe(
      map((user) => user.id),
      switchMap((userId) =>
        this.userEntityService.entities$.pipe(
          map((users) => users.find((x) => x.id == userId))
        )
      )
    ); */
  }
  printPage() {
    window.print();
  }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
}
