import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes, faUserTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'save-user-error',
  templateUrl: './save-user-error.component.html',
  styleUrls: ['./save-user-error.component.scss']
})
export class SaveUserErrorComponent {
  faTimes = faTimes;
  faUserTimes = faUserTimes;
  constructor(
    private snackRef: MatSnackBarRef<SaveUserErrorComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data
  ) { }
  onClose() {
    this.snackRef.dismiss();
  }
}
