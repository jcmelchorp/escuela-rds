import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

import { Group } from '@rds-admin/models/users-domain.model';
import * as fromGroup from './';

@Injectable()
export class GroupEntityService extends EntityCollectionServiceBase<Group> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromGroup.entityCollectionName, serviceElementsFactory);
  }
}
