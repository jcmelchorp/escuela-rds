import { Component, OnInit } from '@angular/core';

import { QueryParams } from '@ngrx/data';

import { AuthEffects } from '@rds-auth/state/effects/auth.effects';

import { UserDomain } from '@rds-admin/models/users-domain.model';
import { UserDomainEntityService } from '@rds-admin/state/user-domain/user-domain-entity.service';

import { CourseLevel, SchoolLevel } from '@rds-auth/models/user.enum';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-school-home',
  templateUrl: './school-home.component.html',
  styleUrls: ['./school-home.component.scss']
})
export class SchoolHomeComponent implements OnInit {
  users$: Observable<UserDomain[]>;
  loaded$: Observable<boolean>;
  level: string;
  grade: string;
  fullName: string;
  clevelKeys;
  clevels = CourseLevel;
  slevelKeys;
  slevels = SchoolLevel;
  queryParams: QueryParams;
  raisedElev = 8;
  searching: boolean = false;

  constructor(
    private userDomainEntityService: UserDomainEntityService,
  ) {
    this.loaded$ = this.userDomainEntityService.loaded$;
    this.clevelKeys = Object.keys(this.clevels).filter(Number);
    this.slevelKeys = Object.keys(this.slevels).filter(Number);
    /*  this.level = "Primaria";
     this.grade = "1° de Primaria";
     this.queryParams = { level: this.level, grade: this.grade }; */
  }



  ngOnInit(): void {
    this.queryParams = { level: this.level, grade: this.grade }
    this.users$ = this.userDomainEntityService.entities$
      .pipe(map(users => {
        if (!users) {
          this.userDomainEntityService.getWithQuery(this.queryParams);
        }
        return users.filter(x => x.orgUnitPath.endsWith(this.grade))
      }));
  }
  onLevelelection(event) {
    this.level = event.key;
    this.queryParams = { level: this.level, grade: this.grade }

  }
  onGradeSelection(event) {
    this.grade = event.key;
    this.queryParams = { level: this.level, grade: this.grade };

  }
  onSearch() {
    this.queryParams = { level: this.level, grade: this.grade };
    this.users$ = this.userDomainEntityService.entities$
      .pipe(map(users => {
        if (!users) {
          this.userDomainEntityService.getWithQuery(this.queryParams);
        }
        return users.filter(x => x.orgUnitPath.endsWith(this.grade))
      }));
  }
}
