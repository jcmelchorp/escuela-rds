import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  faBars,
  faSignInAlt,
  faShieldAlt,
  faSignOutAlt,
  faEllipsisV,
  faGlobe,
  faInfo,
  faUserTie,
  faCog,
  faSlidersH,
  faDoorOpen,
  faDoorClosed,
} from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';

import { AppState } from '@rds-store/app.state';

import { signOut } from '@rds-auth/state/auth.actions';
import { LoginDialogComponent } from '@rds-auth/components/login-dialog/login-dialog.component';
import { User } from '@rds-auth/models/user.model';

import { SubscriptionService } from '@rds-shared/services';

import { LayoutService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe],
})
export class HeaderComponent implements OnInit {
  @Input() isHandset: boolean;
  @Input() user: User;
  @Input() isOnline: boolean;
  @Input() isAdmin: boolean;
  @Input() isTeacher: boolean;
  myDate: Date;

  isDoorOpen: boolean = false;
  faBars = faBars;
  faSignIn = faSignInAlt;
  faEllipsisV = faEllipsisV;
  faShieldAlt = faShieldAlt;
  faSignOut = faSignOutAlt;
  faUserTie = faUserTie;
  faGlobe = faGlobe;
  faGoogle = faGoogle;
  faInfo = faInfo;
  faDoorOpen = faDoorOpen;
  faDoorClosed = faDoorClosed;
  faCog = faCog;
  faSlidersH = faSlidersH;
  linkText: boolean = false;
  themes: string[];

  constructor(
    private layoutService: LayoutService,
    private subService: SubscriptionService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.myDate = new Date();
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
  toggleSidenavLeft($event: any) {
    this.layoutService.toggleSidenavLeft.emit($event);
  }
  onSignIn() {
    this.isDoorOpen = true;
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      height: 'fit-content',
      width: 'fit-content',
      maxWidth: '512px',
      data: { isDoorOpen: this.isDoorOpen },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isDoorOpen = result.data.isDoorOpen;
      }
    });
  }
  onSignOut() {
    this.isDoorOpen = false;
    this.store.dispatch(signOut({ user: this.user }));
  }
}
