import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Update } from '@ngrx/entity';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

import { AdminApiService } from '@rds-admin/services';
import { AdminFireService } from '@rds-admin/services/admin-fire.service';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserDomain } from '@rds-admin/models/users-domain.model';
import * as fromUserDomain from './';
@Injectable()
export class UserDomainDataService extends DefaultDataService<UserDomain> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private adminApiService: AdminApiService
  ) {
    super(fromUserDomain.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<UserDomain[]> {
    return from(this.adminApiService.listAllUsers());
  }
  getWithQuery(queryParams: QueryParams): Observable<UserDomain[]> {
    return from(this.adminApiService.getStudents(queryParams));
  }
  update(user: Update<UserDomain>): Observable<UserDomain> {
    return from(this.adminApiService.updateUser(user.changes));
  }
  getByKey(userKey: string): Observable<UserDomain> {
    return from(this.adminApiService.getUserDomain(userKey));
  }
  add(user: Partial<UserDomain>) {
    return from(this.adminApiService.addUser(user));
  }
}
