import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  faUser,
  faSchool,
  faChalkboardTeacher,
  faUserCog,
  faCompressAlt,
  faUserPlus,
  faAward,
  faExpandAlt,
  faUserShield,
  faBuilding,
  faUserGraduate,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';

import { LayoutService } from '../../services/layout.service';
import {
  animateText,
  onMainContentChange,
  onSideNavChange,
} from '../../../shared/animations/animations';

import { User } from '@rds-auth/models/user.model';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [onMainContentChange, onSideNavChange, animateText],
})
export class SidenavComponent implements OnInit {
  @ViewChild('leftSidenav') sidenavLeft: MatSidenav;
  @Input() isHandset: boolean;
  @Input() isOnline: boolean;
  @Input() isAdmin: boolean;
  @Input() isTeacher: boolean;
  @Input() user: User;
  @Output() routeUser: EventEmitter<User>;
  sideNavState: boolean = false;
  onSideNavChange: boolean;
  linkText: boolean = false;
  faChalkboardTeacher = faChalkboardTeacher;
  faUserPlus = faUserPlus;
  faAward = faAward;
  faUserTie = faUserTie;
  faCompressAlt = faCompressAlt;
  faExpandAlt = faExpandAlt;
  faUserShield = faUserShield;
  faUserGraduate = faUserGraduate;
  faSchool = faSchool;
  faUserCog = faUserCog;
  faGoogle = faGoogle;
  faBuilding = faBuilding;
  faIdBadge = faIdBadge;
  alert: any = {
    type: 'success',
    msg: `<div>
    <h2>
    Transmitiendo <strong>en vivo</strong>! Jueves 11 de Febrero, 9 am.
    </h2>
    Acompáñanos en la elaboración de <strong>galletas</strong> con motivo del día del amor y la amistad.
    <strong>Pulsa esta notificación</strong>
    </div>`,
  };
  dismissible = true;

  constructor(private layoutService: LayoutService) {
    this.layoutService.toggleSidenavLeft.subscribe(() => {
      this.sidenavLeft.toggle();
    });
  }

  ngOnInit(): void {
    this.layoutService.sideNavState$.subscribe((res) => {
      this.onSideNavChange = res;
    });
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 100);
    this.layoutService.sideNavState$.next(this.sideNavState);
  }
}
