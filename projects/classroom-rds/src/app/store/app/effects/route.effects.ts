import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromAuthActions from '@rds-auth/state/auth.actions';

import { tap } from 'rxjs/operators';
@Injectable()
export class RouteEffects {

  goroot$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.signInSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
  gohome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.signOutCompleted),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
  goprofile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.updateProfileSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private router: Router,
    // private location: Location
  ) { }
}
