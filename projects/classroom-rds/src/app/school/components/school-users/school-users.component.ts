import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  faCircle,
  faUserSlash,
  faUserTag,
  faUserEdit,
  faIdCardAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { User } from '@rds-auth/models/user.model';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaveUserConfirmComponent } from '../save-user-confirm/save-user-confirm.component';
import { SaveUserErrorComponent } from '../save-user-error/save-user-error.component';
import { SaveUserComponent } from './../save-user/save-user.component';
import { ConfirmDialogComponent } from '@rds-shared/components/confirm-dialog/confirm-dialog.component';
import { moveIn } from '@rds-shared/animations/router.animations';
@Component({
  selector: 'app-school-users',
  templateUrl: './school-users.component.html',
  styleUrls: ['./school-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [moveIn()],
})
export class SchoolUsersComponent implements OnInit {
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  users$: Observable<User[]>;
  isSuspended: boolean = false;
  isAdmin: boolean = false;
  searchForm: FormGroup;
  selectedRoles: string[] = [];
  searchString: string = '';
  userRoles: string[] = ['alumnos', 'profesores', 'administrativos', 'otros'];
  userCount: number = 0;
  faCircle = faCircle;
  faTrashAlt = faTrashAlt;
  faUserSlash = faUserSlash;
  faUserTag = faUserTag;
  faUserEdit = faUserEdit;
  faUserCircle = faUserCircle;
  faIdCard = faIdCard;
  faIdCardAlt = faIdCardAlt;
  roleIcons: any[] = [{}];
  constructor(
    private userEntityService: UserEntityService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.loaded$ = this.userEntityService.loaded$;
    this.loading$ = this.userEntityService.loading$;
    //this.initForm();
    //this.filteredUsers$ = this.userEntityService.filteredEntities$;
  }
  refreshList() {
    this.users$ = this.userEntityService.entities$.pipe(
      map((users) => {
        let result: User[] = [];
        if (this.searchString == '') {
          if (this.selectedRoles.length == 0) {
            result.push(
              ...users
                .filter((u) => u.suspended == this.isSuspended)
                .filter((u) => u.isAdmin == this.isAdmin)
            );
          } else if (this.selectedRoles) {
            this.selectedRoles.forEach((role) =>
              result.push(
                ...users
                  .filter((u) => u.role == role.toLowerCase())
                  .filter((u) => u.suspended == this.isSuspended)
                  .filter((u) => u.isAdmin == this.isAdmin)
              )
            );
          }
          this.userCount = result.length;
        } else {
          if (this.selectedRoles.length == 0) {
            result.push(
              ...users
                .filter((u) =>
                  u.name.fullName
                    .toLocaleLowerCase()
                    .includes(this.searchString.toLocaleLowerCase())
                )
                .filter((u) => u.suspended == this.isSuspended)
                .filter((u) => u.isAdmin == this.isAdmin)
            );
          } else {
            this.selectedRoles.forEach((role) =>
              result.push(
                ...users
                  .filter((u) => u.role.toLowerCase() == role.toLowerCase())
                  .filter((u) => u.suspended == this.isSuspended)
                  .filter((u) => u.isAdmin == this.isAdmin)
                  .filter((u) =>
                    u.name.fullName
                      .toLocaleLowerCase()
                      .includes(this.searchString.toLocaleLowerCase())
                  )
              )
            );
          }
          this.userCount = result.length;
        }
        return result;
      })
    );
  }
  /* initForm() {
    this.searchForm = this.fb.group({
      name: new FormControl(),
      role: new FormControl(this.userRoles),
      isSuspended: new FormControl(false),
      isAdmin: new FormControl(false)
    });

    this.searchForm.valueChanges.pipe(
      map(value => {
        this.userEntityService.setFilter({ role: value.role, name: value.name })
      })
    )
  }
  filter() {
    //this.userEntityService.setFilter({ name: 'jan' });
    this.searchForm.valueChanges.pipe(
      map(value => {
        this.userEntityService.setFilter({ name: value.name, role: value.role })
      })
    )
  } */
  ngOnInit(): void {
    this.refreshList();
    //this.filteredUsers$ = this.userEntityService.entities$;
    //this.filteredUsers$ = this.userEntityService.filteredEntities$
  }

  openEditUser(user: Partial<User>) {
    const dialogRef = this.dialog.open(SaveUserComponent, {
      width: '60%',
      minWidth: '500px',
      height: 'fit-content',
      minHeight: '400px',
      data: { user, action: 'actualiza', isInGoogle: true, modified: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        console.log('Creating New User Canceled');
      } else {
        if (result.isInGoogle == true) {
          const user: Partial<User> = {
            id: result.id,
            name: {
              givenName: result.name.givenName,
              familyName: result.name.familyName,
              fullName: [result.name.givenName, result.name.familyName].join(
                ' '
              ),
            },
            password: result.password,
            gender: result.gender,
            dob: result.dob,
            role: result.role,
            grade: result.grade,
            level: result.level,
          };
          this.userEntityService.update(user).subscribe(
            (user) =>
              this.dialog.open(SaveUserConfirmComponent, {
                width: 'fit-content',
                minWidth: '450px',
                height: 'fit-content',
                minHeight: '300px',
                data: { ...user, action: 'Actualiza' },
              }),
            (error) =>
              this.dialog.open(SaveUserErrorComponent, {
                width: 'fit-content',
                height: 'fit-content',
                data: { ...error },
              })
          );
        } else {
        }
      }
    });
  }

  openSuspendUser(user: Partial<User>) {
    const action: string = user.suspended ? 'habilita' : 'inhabilita';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        user,
        action: action,
        subject: 'usuario',
        description: '¿Estás seguro de esta acción?',
        confirm: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      let user: Partial<User> = { ...result.user };
      if (result.confirm) {
        user.suspended = !user.suspended;
        this.userEntityService.update(user, { isOptimistic: true }).subscribe(
          (user) =>
            this.toastr.success(
              `Usuario ${user.name.fullName} fue ${result.action}do con éxito en la institución`,
              `${result.action}ción exitosa`
            ),
          (error) =>
            this.toastr.error(
              `Error al ${result.action}r ${result.subject} en la institución: ${error.message}`,
              `Error en la ${result.action}ción`
            )
        );
      } else {
        this.toastr.warning(
          `${user.name.fullName} no fue ${result.action}do`,
          `${result.action}ción cancelada`
        );
      }
    });
  }
  openDeleteUser(user: Partial<User>) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        user,
        action: 'elimina',
        subject: 'usuario',
        description: '¿Estás seguro de esta acción?',
        confirm: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      result.confirm
        ? this.userEntityService.delete(result.user.id)
        : this.toastr.warning(
            `${result.user.name.fullName} no fue ${result.action}do`,
            `${result.action}ción cancelada`
          );
    });
  }
}
