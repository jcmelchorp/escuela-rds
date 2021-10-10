import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import {
  faAward,
  faUserEdit,
  faSignOutAlt,
  faCheck,
  faTimes,
  faUserCheck,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons';

import { User } from '@rds-auth/models/user.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {
  @Input()
  user!: User;
  @Input()
  isOnline!: boolean;
  @Input()
  isAdmin!: boolean;
  @Input()
  isTeacher!: boolean;
  @Output() logout = new EventEmitter<User>();
  faAward = faAward;
  faUserEdit = faUserEdit;
  faSignOutAlt = faSignOutAlt;
  faUserCheck = faUserCheck;
  faUserTimes = faUserTimes;
  canLogout!: boolean;
  constructor() {}

  ngOnInit(): void {}
  onLogout(): void {
    this.logout.emit(this.user);
    this.canLogout = false;
  }
  cancel(): void {
    this.canLogout = false;
  }
  prepareForLogout(): void {
    this.canLogout = true;
  }
}
