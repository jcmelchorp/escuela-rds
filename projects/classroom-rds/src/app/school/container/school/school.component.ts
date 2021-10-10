import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserDomain } from '@rds-admin/models/users-domain.model';

import { User } from '@rds-auth/models/user.model';

import { SaveUserComponent } from '../../components';
import { SaveUserConfirmComponent } from './../../components/save-user-confirm/save-user-confirm.component';
import { NewCicleDialogComponent } from '../../components/new-cicle-dialog/new-cicle-dialog.component';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
})
export class SchoolComponent implements OnInit {
  newUser: UserDomain;
  constructor(
    private dialog: MatDialog,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {}
  newCicle() {
    const dialogRef = this.dialog.open(NewCicleDialogComponent, {
      width: 'fit-content',
      minWidth: '300px',
      height: 'fit-content',
      minHeight: '200px',
      data: { yearInit: '', yearFinal: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        console.log('Creating New User Canceled');
      } else {
        this.schoolService.createPeriod(result.yearInit, result.yearFinal);
      }
    });
  }
  openSaveUser() {
    const user: User = this.blankUser();
    const dialogRef = this.dialog.open(SaveUserComponent, {
      width: '60%',
      minWidth: '500px',
      height: 'fit-content',
      minHeight: '400px',
      data: { user, action: 'crea', isInGoogle: false },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        console.log('Creating New User Canceled');
      } else {
        this.dialog.open(SaveUserConfirmComponent, {
          data: { ...result },
        });
      }
    });
  }
  blankUser() {
    let user: User = {
      id: '',
      password: '',
      primaryEmail: '',
      name: {
        givenName: '',
        familyName: '',
        fullName: '',
      },
      isHuman: true,
      gender: '',
      dob: '',
      role: '',
      orgUnitPath: '',
      level: '',
      grade: '',
    };
    return user;
  }
}
