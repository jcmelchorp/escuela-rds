import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

import { UserDomain } from '@rds-admin/models/users-domain.model';
import * as fromUserDomain from './';

@Injectable()
export class UserDomainEntityService extends EntityCollectionServiceBase<UserDomain> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromUserDomain.entityCollectionName, serviceElementsFactory);
  }
}
