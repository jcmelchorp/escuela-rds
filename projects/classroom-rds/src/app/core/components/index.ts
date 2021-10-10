
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SettingsComponent } from './settings/settings.component';
import { SidenavComponent } from './sidenav/sidenav.component';

export const layoutComponents: any[] = [
  SettingsComponent,
  MainContentComponent,
  SidenavComponent,
  HeaderComponent,
  FooterComponent
]
export * from './footer/footer.component';
export * from './header/header.component';
export * from './settings/settings.component';
export * from './sidenav/sidenav.component';
export * from './main-content/main-content.component'


