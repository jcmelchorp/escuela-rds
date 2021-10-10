import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';

import { User } from '@rds-auth/models/user.model';

import { SchoolService } from '@rds-school/services/school.service';

import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromUser from './';
@Injectable()
export class UserDataService extends DefaultDataService<User> {


  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private schoolService: SchoolService
  ) {
    super(fromUser.entityCollectionName, http, httpUrlGenerator);
  }

  getAll(): Observable<User[]> {
    return this.schoolService.getUsers().pipe(take(1), map(users => users));
  }

  getWithQuery(grade: string) {
    return this.schoolService.getUsers().pipe(map(users => users.filter(u => u.grade == grade)));
  }
  getByKey(userId: string): Observable<User> {
    return this.getById(userId)
  }
  getById(userId: string): Observable<User> {
    return this.schoolService.getUser(userId);
  }
  get(userId: string): Observable<User> {
    return this.schoolService.getUser(userId);
  }
  add(user: Partial<User>): Observable<User> {
    return this.schoolService.createUser(user);
  }
  update(update: Update<User>): Observable<User> {
    return this.schoolService.updateUser(update.id.toString(), update.changes);
  }
  delete(userId: string): Observable<string> {
    return from(this.schoolService.deleteUser(userId));
  }
}
