import { Injectable } from '@angular/core';

import { EntityAction, EntityCacheAction, ofEntityOp, OP_ERROR, OP_SUCCESS } from '@ngrx/data';
import { Actions, ofType } from '@ngrx/effects';

import { filter } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NgrxToastService {

  constructor(actions$: Actions, toast: ToastrService) {
    actions$.pipe(
      ofEntityOp(),
      filter(
        (ea: EntityAction) =>
          ea.payload.entityOp.endsWith(OP_SUCCESS)
      )
    )
      // this service never dies so no need to unsubscribe
      .subscribe(action =>
        toast.success(
          `${action.payload.entityName} action`,
          action.payload.entityOp
        )
      );

    actions$.pipe(
      ofEntityOp(),
      filter(
        (ea: EntityAction) =>
          ea.payload.entityOp.endsWith(OP_ERROR)
      )
    )
      // this service never dies so no need to unsubscribe
      .subscribe(action =>
        toast.error(
          `${action.payload.entityName} action`,
          action.payload.entityOp
        )
      );


    actions$
      .pipe(
        ofType(
          EntityCacheAction.SAVE_ENTITIES_SUCCESS
        )
      )
      .subscribe((action: any) =>
        toast.success(
          `${action.type} - url: ${action.payload.url}`,
          'SaveEntities'
        )
      );
    actions$
      .pipe(
        ofType(
          EntityCacheAction.SAVE_ENTITIES_ERROR)
      )
      .subscribe((action: any) =>
        toast.error(
          `${action.type} - url: ${action.payload.url}`,
          'SaveEntities'
        )
      );

  }

}
