import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap, take, tap } from 'rxjs/operators';

import * as fromAuthActions from '../auth.actions';
import { User } from '../../models/user.model';
import { AuthFireService } from '../../services/auth-fire.service';
@Injectable()
export class FireEffects {

  saveUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.saveUser),
        tap(action =>
          this.authFireService.createUser(action.user)
        )
      ),
    { dispatch: false }
  );



  checkAdminRole$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.checkAdminRole),
        switchMap((action) =>
          this.authFireService.checkAdminRole(action.id)
            .pipe(
              map((isAdmin: boolean) => fromAuthActions.updateAdminRole({ isAdmin }))
            )
        )
      ),
  );

  checkTeacherRole$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.checkTeacherRole),
        switchMap((action) =>
          this.authFireService.checkTeacherRole(action.id)
            .pipe(
              map((isTeacher: boolean) => fromAuthActions.updateTeachersRole({ isTeacher }))
            )
        )
      )
  );
  fullfillUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signInSuccess),
        switchMap((action) =>
          this.authFireService.getUserById(action.user.id)
            .pipe(
              take(1),
              map((user: User) => fromAuthActions.fullfillUserSuccess({ user }))
            )
        )
      )
  );

  /*  updateProfile$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(fromAuthActions.updateProfile),
         switchMap((action) =>
           this.authFireService.updateUser(action.userData)
             .pipe(
               map(() => {
                 const currentUser: any = this.authFireService.getAuthState();
                 const updatedUser: User = {
                   id: currentUser.id,
                   uid: currentUser.uid,
                   name: currentUser.name,
                   email: currentUser.email,
                   photoUrl: currentUser.photoURL,
                   isTeacher: currentUser.isTeacher,
                   isAdmin: currentUser.isAdmin,
                   isOnline: currentUser.isOnline,
                   isNew: currentUser.isNew,
                 };
                 return fromAuthActions.updateProfileSuccess({ user: updatedUser });
               }),
               catchError((err) => of(fromAuthActions.authError({ error: err })))
             )
         )
       ),
   );
  */
  updateOnlineStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.updateOnlineStatus),
        switchMap((action) =>
          this.authFireService.updateOnlineStatus(action.id, action.isOnline)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authFireService: AuthFireService,
  ) { }
}
