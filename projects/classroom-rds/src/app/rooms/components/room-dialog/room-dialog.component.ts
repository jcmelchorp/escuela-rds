import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faTimes,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { RoomState } from './../../models/room.model';
import { Observable } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss'],
})
export class RoomDialogComponent {
  faTimes = faTimes;
  faChalkboardTeacher = faChalkboardTeacher;
  keys;
  slevelKeys;
  slevels = SchoolLevel;
  states = RoomState;
  formData: FormGroup;
  selected: string; //this.operaciones[0].valor
  periods$: Observable<string[]>;
  constructor(
    private roomService: RoomService,
    public dialogRef: MatDialogRef<RoomDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.periods$ = this.roomService.getPeriods();
    this.slevelKeys = Object.keys(this.slevels).filter((x) => x.length > 5);
    this.keys = Object.keys(this.states).filter(Number);
    this.formData = this.fb.group({
      name: new FormControl(data.room.name, Validators.required),
      description: new FormControl(data.room.description),
      grade: new FormControl(data.room.grade, Validators.required),
      status: new FormControl(data.room.status, Validators.required),
      cicle: new FormControl(data.room.cicle, Validators.required),
    });
  }

  close() {
    this.dialogRef.close();
  }
  resetData() {
    this.formData.reset();
  }
  saveData() {
    if (this.formData.valid) {
      this.dialogRef.close({
        room: { ...this.data.room, ...this.formData.value },
        isNew: this.data.isNew,
        idx: this.data.idx,
      });
    }
  }
}
