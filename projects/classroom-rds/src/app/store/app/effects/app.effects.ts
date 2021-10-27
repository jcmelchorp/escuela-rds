import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { AuthService } from '@rds-auth/services';
import * as fromAuthActions from '@rds-auth/state/auth.actions';
import * as fromAppActions from '@rds-store/app/actions/app.actions';
import * as fromCoreActions from '@rds-core/state/core.actions';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoreService } from '@rds-core/services';
import { defaultPeriod } from '../../../core/state/core.selectors';
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
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => of(this.authService.handleClientLoad())
          .pipe(
            //switchMap(_ => this.coreService.getConfigs()),
            switchMap((/* defaultPeriod */) => [
              //fromCoreActions.loadConfigSuccess({ defaultPeriod }),
              fromAppActions.loadAppSuccess(),
            ]),
            catchError((err) => of(fromAppActions.loadAppFail(err)))
          )
        )
      ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private coreService: CoreService
  ) { }
}
