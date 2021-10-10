import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromAuthSelectors from '@rds-auth/state/auth.selectors';
import { AppState } from '@rds-store/app.state';
import { User } from '@rds-auth/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  user$: Observable<User> | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(fromAuthSelectors.selectUser));
  }
}
