import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '@rds-auth/services';
import * as fromAuthActions from '@rds-auth/state/auth.actions';

import * as fromAppActions from '@rds-store/app/actions/app.actions';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class AppEffects {
  localStoreUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAppActions.localStoreUser),
        tap((action) =>
          localStorage.setItem('user', JSON.stringify(action.user))
        )
      ),
    { dispatch: false }
  );
  removeUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signOutCompleted),
        tap(() =>
          localStorage.removeItem('user')
        )
      ),
    { dispatch: false }
  );

  loadApp$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAppActions.loadApp),
        switchMap(() => of(this.authService.handleClientLoad())
          .pipe(
            map(() => fromAppActions.loadAppSuccess()),
            catchError((err) => of(fromAppActions.loadAppFail(err)))
          )
        )
      ),
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }
}
