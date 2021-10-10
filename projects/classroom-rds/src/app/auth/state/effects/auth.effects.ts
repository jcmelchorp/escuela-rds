import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromAppActions from '@rds-store/app/actions/app.actions';

import { of, Observable, defer, from } from 'rxjs';
import { switchMap, map, catchError, take } from 'rxjs/operators';

import * as fromAuthActions from '../auth.actions';
import { AuthFireService } from '../../services';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.signIn),
      switchMap(() =>
        this.authFireService
          .signInWithPopup() /*  this.authService.handleSignInClick() */
          .pipe(
            map((res) => {
              return {
                id: res.user.providerData[0].uid,
                primaryEmail: res.user.email,
                authPhotoUrl: res.user.photoURL,
                photoUrl: res.user.providerData[0].photoURL,
                displayName: res.user.displayName,
                isNew: res.additionalUserInfo.isNewUser,
                isVerified: res.user.emailVerified,
                creationTime: res.user.metadata.creationTime,
                lastLoginTime: res.user.metadata.lastSignInTime,
                uid: res.user.uid,
              };
            }),
            switchMap((user: User) => {
              if (user.isNew) {
                return [
                  fromAuthActions.signInSuccess({ user }),
                  fromAuthActions.saveUser({ user }),
                ];
              } else {
                return [fromAuthActions.signInSuccess({ user })];
              }
            }),
            catchError((err) => of(fromAuthActions.authError({ error: err })))
          )
      )
    )
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.signInSuccess),
      switchMap((action) => {
        return [
          fromAuthActions.updateOnlineStatus({
            id: action.user.id,
            isOnline: true,
          }),
          fromAuthActions.checkAdminRole({ id: action.user.id }),
          fromAuthActions.checkTeacherRole({ id: action.user.id }),
          fromAppActions.localStoreUser({ user: action.user }),
        ];
      })
    )
  );

  signOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signOut),
        switchMap((action) =>
          from(this.authService.signOut(action.user.id)).pipe(
            switchMap((res) => {
              return [
                fromAuthActions.updateOnlineStatus({
                  id: action.user.id,
                  isOnline: false,
                }),
                fromAuthActions.signOutCompleted(),
              ];
            }),
            catchError((err) => of(fromAuthActions.authError({ error: err })))
          )
        )
      )
    //{ dispatch: false }
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.getUser),
      switchMap(() =>
        this.authFireService.getAuthState().pipe(
          take(1),
          map((authData: any) => {
            if (authData) {
              const user = {
                id: authData.user.providerData[0].uid,
                name: authData.user.displayName,
                primaryEmail: authData.user.email,
                photoUrl: authData.user.photoURL,
                authPhotoUrl: authData.authPhotoUrl,
                isTeacher: authData.isTeacher,
                isAdmin: authData.isAdmin,
                isNew: authData.isNewUser,
                isVerified: authData.user.emailVerified,
                creationTime: authData.user.metadata.creationTime,
                lastLogin: authData.user.metadata.lastSignInTime,
                uid: authData.user.uid,
              };
              return fromAuthActions.signInSuccess({ user });
            } else {
              return fromAuthActions.signInFailure({ error: authData });
            }
          }),
          catchError((error) => of(fromAuthActions.authError({ error })))
        )
      )
    )
  );

  init$: Observable<any> = defer(() => {
    return of(fromAuthActions.getUser());
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authFireService: AuthFireService
  ) {}
}
