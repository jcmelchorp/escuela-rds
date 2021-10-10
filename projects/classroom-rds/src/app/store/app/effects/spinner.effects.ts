import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromAppActions from '@rds-store/app/actions/app.actions';

import * as fromAuthActions from '@rds-auth/state/auth.actions';

import { NgxSpinnerService } from 'ngx-spinner';

import { tap } from 'rxjs/operators';
@Injectable()
export class SpinnerEffects {
  spinneron$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAppActions.loadApp,
          fromAuthActions.signIn,
          fromAuthActions.updateProfile,
        ),
        tap(() => this.spinner.show())
      ),
    { dispatch: false }
  );

  spinneroff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAppActions.loadAppFail,
          fromAppActions.loadAppSuccess,
          fromAuthActions.authError,
          fromAuthActions.signInSuccess,
          fromAuthActions.signInFailure,
          fromAuthActions.updateProfileSuccess,
        ),
        tap(() => {
          setTimeout(() => {
            this.spinner.hide();
          }, 200);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions, private spinner: NgxSpinnerService
  ) { }
}
