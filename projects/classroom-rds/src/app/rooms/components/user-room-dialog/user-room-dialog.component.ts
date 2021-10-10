import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { SchoolService } from '@rds-school/services/school.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RoomService } from '../../services/room.service';
import { User } from '@rds-auth/models/user.model';
import { UserEntityService } from '@rds-store/user/user-entity.service';
@Component({
  templateUrl: './user-room-dialog.component.html',
  styleUrls: ['./user-room-dialog.component.scss'],
})
export class UserRoomDialogComponent implements OnInit {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  users$: Observable<User[]>;
  myControl = new FormControl();
  filteredOptions: Observable<User[]>;
  constructor(
    public dialogRef: MatDialogRef<UserRoomDialogComponent>,
    private userEntityService: UserEntityService,
    private roomService: RoomService,
    private schoolService: SchoolService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      switchMap((email) => this.autocompleteUsers(email))
    );
  }

  private autocompleteUsers(value: string) {
    const filterValue = value.toLowerCase();
    return this.userEntityService.entities$.pipe(
      map((users) =>
        users.filter(
          (u) =>
            u.suspended == false &&
            u.role == 'alumnos' &&
            u.primaryEmail.includes(filterValue)
        )
      )
    );
  }

  close() {
    this.dialogRef.close();
  }
}
