import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

import { UserDomainEntityService } from '../state/user-domain/user-domain-entity.service';

@Injectable()
export class UserDomainsResolver implements Resolve<boolean> {

  constructor(private userDomainEntityService: UserDomainEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userDomainEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.userDomainEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
