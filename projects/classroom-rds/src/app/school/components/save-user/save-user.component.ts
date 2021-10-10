import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AdminApiService } from '@rds-admin/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CourseLevel, SchoolLevel } from '@rds-auth/models/user.enum';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { UserDomain } from '@rds-admin/models/users-domain.model';
import { User } from '@rds-auth/models/user.model';
@Component({
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss'],
})
export class SaveUserComponent implements OnInit {
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  hide: boolean = false;
  saveForm: FormGroup;
  newUser: Observable<UserDomain>;
  clevelKeys;
  clevels = CourseLevel;
  slevelKeys;
  slevels = SchoolLevel;
  constructor(
    private dialogRef: MatDialogRef<SaveUserComponent>,
    private adminApiService: AdminApiService,
    private userEntityService: UserEntityService,
    private toast: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.clevelKeys = Object.keys(this.clevels).filter(Number);
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      givenName: new FormControl(this.data.user.name.givenName, [
        Validators.required,
      ]),
      familyName: new FormControl(this.data.user.name.familyName, [
        Validators.required,
      ]),
      primaryEmail: new FormControl(this.data.user.primaryEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.data.user.password, [Validators.required]),
      gender: new FormControl(this.data.user.gender),
      dob: new FormControl(new Date(this.data.user.dob)),
      role: new FormControl(this.data.user.role.toLowerCase()),
      grade: new FormControl(this.data.user.grade),
      level: new FormControl(this.data.user.level),
      isInGoogle: new FormControl(this.data.isInGoogle),
      isHuman: new FormControl(this.data.user.isHuman),
    });
  }
  onSubmit() {
    if (this.data.action == 'crea') {
      if (!this.saveForm.get('isInGoogle').value) {
        let googleUser: Partial<UserDomain> = {
          password: this.saveForm.get('password').value,
          primaryEmail: this.saveForm.get('primaryEmail').value,
          name: {
            givenName: this.saveForm.get('givenName').value,
            familyName: this.saveForm.get('familyName').value,
            fullName: [
              this.saveForm.get('givenName').value,
              this.saveForm.get('familyName').value,
            ].join(' '),
          },
          changePasswordAtNextLogin: false,
          orgUnitPath: ['/Dirección', this.saveForm.get('role').value].join(
            '/'
          ),
        };
        if (
          this.saveForm.get('role').value == 'alumnos' &&
          this.saveForm.get('level').value != null &&
          this.saveForm.get('grade').value != null
        ) {
          googleUser.orgUnitPath = [
            googleUser.orgUnitPath,
            this.saveForm.get('level').value,
            this.saveForm.get('grade').value,
          ].join('/');
        }
        this.adminApiService.addUser(googleUser).then(
          (newGoogleUser) => {
            const dayOfBirth: string = this.saveForm
              .get('dob')
              .value.toLocaleDateString();
            this.toast.success(
              `Usuario ${newGoogleUser.name.fullName} fue ${this.data.action}do con éxito en la institución`,
              `Usuario de Google`
            );
            const firebaseUser: User = this.firebaseUser(newGoogleUser);
            this.userEntityService
              .add(firebaseUser, { isOptimistic: false })
              .subscribe(
                (firebaseUser) => {
                  this.toast.success(
                    `Usuario ${firebaseUser.name.fullName} fue creado con éxito en la institución`,
                    `Expediente de usuario`
                  );
                  this.dialogRef.close({
                    ...firebaseUser,
                    action: this.data.action,
                  });
                },
                (error: any) => {
                  this.toast.error(
                    `Error al crear el usuario de Firebase: ${error.message}`,
                    `Error en la ${this.data.action}ción`
                  );
                }
              );
          },
          (googleError) => {
            this.toast.error(
              `Error al crear el usuario de Google: ${googleError.result.error.message}`,
              `Error en la ${this.data.action}ción`
            );
          }
        );
      } else if (this.saveForm.get('isInGoogle').value) {
        this.adminApiService
          .getUserDomain(this.saveForm.get('primaryEmail').value)
          .then(
            (googleUser: UserDomain) => {
              const firebaseUser: User = this.firebaseUser(googleUser);
              this.userEntityService
                .add(firebaseUser, { isOptimistic: false })
                .subscribe(
                  (firebaseUser) => {
                    this.toast.success(
                      `Usuario ${firebaseUser.name.fullName} fue creado con éxito en la institución`,
                      `Usuario ${this.data.action}do`
                    );
                    this.dialogRef.close(firebaseUser);
                  },
                  (error: any) => {
                    this.toast.error(
                      `Error al crear el usuario de Firebase: ${error.message}`,
                      `Error en la ${this.data.action}ción`
                    );
                  }
                );
            },
            (googleError) => {
              this.toast.error(
                `Error al crear el usuario de Google: ${googleError.result.error.message}`,
                `Error en la ${this.data.action}ción`
              );
            }
          );
      }
    } else if (this.data.action == 'actualiza') {
      if (this.saveForm.get('isInGoogle').value) {
        const firebaseUser: User = { id: this.data.user.id };
        this.saveForm['_forEachChild']((control, name) => {
          if (control.dirty) {
            if (name != 'familyName' && name != 'givenName') {
              firebaseUser[name] = control.value;
            } else {
              if (name == 'familyName')
                firebaseUser.name.familyName = control.value;
              if (name == 'givenName')
                firebaseUser.name.givenName = control.value;
            }
            if (name == 'role')
              firebaseUser[name] = control.value.toLowerCase();
          }
        });
        this.userEntityService
          .update(firebaseUser, { isOptimistic: true })
          .subscribe(
            (firebaseUser) => {
              this.dialogRef.close(firebaseUser);
            },
            (error: any) => {
              this.toast.error(
                `Error al crear el usuario de Firebase: ${error.message}`,
                `Error en la ${this.data.action}ción`
              );
            }
          );
      } else if (!this.saveForm.get('isInGoogle').value) {
        this.toast.warning('Esta opcion no esta lista aún', 'Pendiente');
      }
    }
  }

  firebaseUser(googleUser: Partial<UserDomain>) {
    const dayOfBirth: string = this.saveForm
      .get('dob')
      .value.toLocaleDateString();
    const firebaseUser: User = {
      id: googleUser.id ? googleUser.id : '',
      primaryEmail: googleUser.primaryEmail,
      isAdmin: googleUser.isAdmin,
      isTeacher: this.saveForm.get('role').value == 'Profesores',
      orgUnitPath: googleUser.orgUnitPath,
      password: this.saveForm.get('password').value,
      role: this.saveForm.get('role').value.toLowerCase(),
      level: this.saveForm.get('level').value,
      grade: this.saveForm.get('grade').value,
      archived: false,
      gender: this.saveForm.get('gender').value,
      name: {
        givenName: googleUser.name.givenName,
        familyName: googleUser.name.familyName,
        fullName: [
          this.saveForm.get('givenName').value,
          this.saveForm.get('familyName').value,
        ].join(' '),
      },
      customerId: googleUser.customerId,
      suspended: false,
      suspensionReason: '',
      curp: '',
      rfc: '',
      dob: dayOfBirth,
      isNew: true,
      isOnline: false,
      isVerified: false,
      authPhotoUrl: '',
      photoUrl: '',
      displayName: [
        this.saveForm.get('givenName').value,
        this.saveForm.get('familyName').value,
      ].join(' '),
      creationTime: googleUser.creationTime,
      lastLoginTime: '',
      niev: '',
      parents: [
        {
          name: {
            fullName: '',
            givenName: '',
            familyName: '',
          },
          city: '',
          curp: '',
          email: '',
          gender: '',
        },
      ],
      permission: '',
    };
    return firebaseUser;
  }

  /* .then(
    () => {
      this.dialog.open(SaveUserConfirmComponent, {
        width: 'fit-content',
        minWidth: '450px',
        height: 'fit-content',
        minHeight: '300px',
        data: { ...user, action: 'Crea' }
      });
    },
    error => {
      this.dialog.open(SaveUserErrorComponent, {
        width: 'fit-content',
        height: 'fit-content',
        data: { ...error.result }
      });
    }
  );
},
error => {
this.dialog.open(SaveUserErrorComponent, {
  width: 'fit-content',
  height: 'fit-content',
  data: { ...error.result }
});
}
*/

  /*  this.schoolService.createUser(user).then(
           () => {
             this.dialog.open(SaveUserConfirmComponent, {
               width: 'fit-content',
               minWidth: '450px',
               height: 'fit-content',
               minHeight: '300px',
               data: { ...user, action: 'Crea' }
             });
           },
           error => {
             this.dialog.open(SaveUserErrorComponent, {
               width: 'fit-content',
               height: 'fit-content',
               data: { ...error.result }
             });
           }
         );
     },
     error => {
       this.dialog.open(SaveUserErrorComponent, {
         width: 'fit-content',
         height: 'fit-content',
         data: { ...error.result }
       });
     }
     );
   } else {
     this.adminApiService.addUser(googleUser).then(
       user => {
         this.newUser = user;

     );
   }
*/

  /*  submitCreateFirebase() {

     if (this.data.action == 'crea') {
       this.userEntityService.add(firebaseUser)
     }
     this.userEntityService.update(firebaseUser).subscribe(
       () => {
         this.snackbar.open(`Usuario ${this.data.action}do`, 'ok', { duration: 3000 });
         this.dialogRef.close(firebaseUser);
       },
       (error: any) => {
         this.snackbar.open(`Error ${error}`, 'ok')
       }
     );
   } */
  onClose() {
    this.dialogRef.close();
  }
  roleChange() {
    if (this.data.role != 'Alumnos') {
      this.data.grade = '';
      this.data.level = '';
    } else {
      this.data.parents = [
        {
          name: {
            fullName: '',
            givenName: '',
            familyName: '',
          },
          city: '',
          curp: '',
          email: '',
          gender: '',
        },
      ];
    }
    this.data.modified = true;
  }
  dobChange() {
    this.data.dob = this.data.dob.toLocaleDateString();
    this.data.modified = true;
  }
  wasModify() {
    this.data.modified = true;
  }
}
