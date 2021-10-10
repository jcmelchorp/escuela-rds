import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromAuthActions from '@rds-auth/state/auth.actions';

import { SnackService } from '@rds-shared/services/snack.service';

import { ToastrService } from 'ngx-toastr';

import { tap } from 'rxjs/operators';

@Injectable()
export class SnackEffects {
  /*  checkingYourInformation$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(fromAuthActions.signIn),
         tap(() => this.snackService.justMessage('Checking your information'))
       ),
     { dispatch: false }
   );
  */
  updatedUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.updateProfileSuccess),
        tap((action) => this.toastrService.info(`El usuario ${action.user.id} se actualizó con éxito`, 'Usuario actualizado'))
      ),
    { dispatch: false }
  );

  welcomeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signInSuccess),
        tap((user) =>
          /* this.snackService.messageWithComponent(action.user, {
            vPos: 'bottom', hPos: 'center', setAutoHide: true,
            hide: 5000, action: true, actionString: 'Ok', extra: false, message: 'Has ingresado como: ' + action.user.displayName
          }) */
          this.toastrService.success(`Has ingresado como: ${user.user.displayName}`)
        )
      ),
    { dispatch: false }
  );

  /*  welcome$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(fromAppActions.loadAppSuccess),
         tap(() =>
           setTimeout(() => {
             this.snackService.justMessage('La aplicación está lista')
           }, 2000)
         )
       ),
     { dispatch: false }
   ); */

  unableToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.authError),
        tap((error) => {
          this.toastrService.error(error.error.message, error.error.code);
        })
      ),
    { dispatch: false }
  );

  youAreLoggedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signOut),
        tap(() => this.toastrService.success('Finazlizando sesión', 'Registro de acceso'))
      ),
    { dispatch: false }
  );

  comeBackSoon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.signOutCompleted),
        tap(() =>
          setTimeout(() => {
            this.toastrService.success('Tu sesión ha terminado. Vuelve pronto!', 'Registro de acceso');
          }, 2000)
        )
      ),
    { dispatch: false }
  );

  userCreated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.saveUser),
        tap((user) => this.toastrService.success(`Usuario registrado: ${user.user.displayName}`, 'Registro de acceso'))
      ),
    { dispatch: false }
  );



  constructor(
    private actions$: Actions,
    private snackService: SnackService,
    private toastrService: ToastrService
  ) { }
}
