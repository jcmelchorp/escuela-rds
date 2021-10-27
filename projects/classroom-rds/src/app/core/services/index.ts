import { LayoutService } from './layout.service';
import { ThemeService } from './theme.service';
import { CoreService } from './core.service';

export const coreServices: any[] = [
  LayoutService,
  ThemeService,
  CoreService
];
export * from './layout.service';
export * from './theme.service';
export * from './core.service';

