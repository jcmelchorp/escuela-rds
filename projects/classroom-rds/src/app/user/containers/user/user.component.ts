import { Component, OnDestroy, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AppState } from '@rds-store/app.state';

import {
  isAdmin,
  isLoggedIn,
  isTeacher,
  selectUser,
} from '@rds-auth/state/auth.selectors';
import { signOut } from '@rds-auth/state/auth.actions';

import { UserDomain } from '@rds-admin/models/users-domain.model';

import { User } from '@rds-auth/models/user.model';

import { SubscriptionService } from '@rds-shared/services/subscription.service';

import { UserEntityService } from '@rds-store/user/user-entity.service';

import { switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  user$!: Observable<any>;
  isOnline$!: Observable<boolean>;
  loading$: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  isTeacher$!: Observable<boolean>;
  userDomain!: Observable<UserDomain>;
  userSub!: Subscription;
  constructor(
    private store: Store<AppState>,
    private subService: SubscriptionService,
    private userEntityService: UserEntityService
  ) {
    this.loading$ = this.userEntityService.loading$;
  }
  ngOnInit(): void {
    this.user$ = this.store.pipe(
      select(selectUser),
      map((user) => {
        if (user) {
          return this.userEntityService.entities$.pipe(
            map((users) => users.find((x) => x.id == user.id))
          );
        } else {
          return null;
        }
      })
    );
    this.isOnline$ = this.store.pipe(select(isLoggedIn));
    this.isAdmin$ = this.store.pipe(select(isAdmin));
    this.isTeacher$ = this.store.pipe(select(isTeacher));
  }
  logoutUser(user: User) {
    this.store.dispatch(signOut({ user }));
  }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
}
