import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';

import { appearanceModules } from '../modules';

import { sharedComponents } from './components';
import { sharedServices } from './services';

export const sharedModules: any[] = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
];
@NgModule({
  imports: [
    ...sharedModules,
    ...appearanceModules,
    AlertModule,
    CarouselModule,
  ],
  exports: [
    ...sharedModules,
    ...sharedComponents,
    ...appearanceModules,
  ],
  providers: [...sharedServices],
  declarations: [...sharedComponents],

})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...sharedServices]
    }
  }
}
