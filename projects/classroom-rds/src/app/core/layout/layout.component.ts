import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';

import { faCookieBite } from '@fortawesome/free-solid-svg-icons';

import { select, Store } from '@ngrx/store';

import { AppState } from '@rds-store/app.state';

import { signInSuccess } from '@rds-auth/state/auth.actions';
import * as fromAuthSelectors from '@rds-auth/state/auth.selectors';

import { loadApp } from '@rds-store/app/actions/app.actions';

import { User } from '@rds-auth/models/user.model';

import { Observable } from 'rxjs';

import { LayoutService, ThemeService } from '../services';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isHandset$: Observable<boolean>;
  isDarkTheme: Observable<boolean>;
  user$: Observable<User>;
  isOnline$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isTeacher$: Observable<boolean>;
  loading = false;
  faCookieBite = faCookieBite;
  constructor(
    private layoutService: LayoutService,
    public themeService: ThemeService,
    private store: Store<AppState>,
    private router: Router,
    private overlay: OverlayContainer,

  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    });
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.store.dispatch(signInSuccess({ user }));
    }
    this.store.dispatch(loadApp());
    this.isOnline$ = this.store.pipe(select(fromAuthSelectors.isLoggedIn));
    this.user$ = this.store.pipe(select(fromAuthSelectors.selectUser));
    this.isAdmin$ = this.store.pipe(select(fromAuthSelectors.isAdmin));
    this.isTeacher$ = this.store.pipe(select(fromAuthSelectors.isTeacher));
  }
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  }
  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isDarkTheme.subscribe(isDark => {
      if (isDark) {
        this.overlay.getContainerElement().classList.add('dark-theme');
      } else {
        this.overlay.getContainerElement().classList.remove('dark-theme');
      }
    });
    this.isHandset$ = this.layoutService.isHandset$;
  }
}
