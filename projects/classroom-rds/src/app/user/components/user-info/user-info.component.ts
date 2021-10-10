import { Component, OnInit } from '@angular/core';

import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { AppState } from '@rds-store/app.state';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user$: Observable<User | null>;
  faPrint = faPrint;
  faFilePdf = faFilePdf;
  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser);
  }
  ngOnInit(): void {}
  printPage() {
    window.print();
  }
}
