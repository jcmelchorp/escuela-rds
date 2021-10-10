import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from '@rds-auth/models/user.model';
import { SubscriptionService } from '@rds-shared/services';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-school-teachers',
  templateUrl: './school-teachers.component.html',
  styleUrls: ['./school-teachers.component.scss'],
})
export class SchoolTeachersComponent implements OnInit {
  users$: Observable<User[]>;
  faCircle = faCircle;
  loaded$: Observable<boolean>;

  constructor(
    private subService: SubscriptionService,
    private userEntityService: UserEntityService
  ) {
    this.loaded$ = this.userEntityService.loaded$;
  }

  ngOnInit(): void {
    this.users$ = this.userEntityService.entities$.pipe(
      map((users) => users.filter((u) => u.isTeacher == true))
    );
  }
}
