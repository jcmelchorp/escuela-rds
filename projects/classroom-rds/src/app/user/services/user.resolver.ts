import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { select, Store } from '@ngrx/store';

import { AppState } from '@rds-store/app.state';

import { selectUser } from '@rds-auth/state/auth.selectors';

import { UserEntityService } from '@rds-store/user/user-entity.service';

import { Observable, Subscription } from 'rxjs';
import {
  filter,
  first,
  map,
  mapTo,
  switchMap,
  take,
  tap,
  mergeMap,
} from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<boolean> {
  userId: string = '';
  subscript!: Subscription;
  constructor(
    private userEntityService: UserEntityService,
    private store: Store<AppState>
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userEntityService.loading$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store
            .select(selectUser)
            .subscribe((user) => this.userEntityService.getByKey(user.id));
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
