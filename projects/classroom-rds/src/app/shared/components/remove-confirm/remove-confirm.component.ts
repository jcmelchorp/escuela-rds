import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './remove-confirm.component.html',
  styleUrls: ['./remove-confirm.component.scss']
})
export class RemoveConfirmComponent implements OnInit {
  faTimes = faTimes;
  constructor(
    private dialogRef: MatDialogRef<RemoveConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

}
