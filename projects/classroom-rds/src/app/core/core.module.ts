import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '@rds-shared/shared.module';

import { AlertModule } from 'ngx-bootstrap/alert';

import { layoutComponents } from './components';
import { coreServices } from './services';
import * as fromCoreReducer from './state/core.reducer';
import { LayoutComponent } from './layout/layout.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppEffects } from '../store/app/effects/app.effects';
@NgModule({
  declarations: [
    ...layoutComponents,
    LayoutComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromCoreReducer.configKey, fromCoreReducer.configReducer),
    EffectsModule.forFeature([AppEffects]),
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
