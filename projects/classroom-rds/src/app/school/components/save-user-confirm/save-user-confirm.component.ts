import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes, faUserCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './save-user-confirm.component.html',
  styleUrls: ['./save-user-confirm.component.scss']
})
export class SaveUserConfirmComponent implements OnInit {
  faTimes = faTimes;
  faUserCheck = faUserCheck;
  constructor(
    private dialogRef: MatDialogRef<SaveUserConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
  }
  printPage() {
    window.print();
  }
}
