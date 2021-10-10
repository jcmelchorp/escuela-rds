import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '@rds-shared/shared.module';

import { AlertModule } from 'ngx-bootstrap/alert';

import { layoutComponents } from './components';
import { coreServices } from './services';

import { LayoutComponent } from './layout/layout.component';
@NgModule({
  declarations: [
    ...layoutComponents,
    LayoutComponent
  ],
  imports: [
    SharedModule,
    AlertModule,
  ],
  providers: [...coreServices],
  exports: [...layoutComponents]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module')
    }
  }
}
