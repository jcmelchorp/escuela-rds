import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { selectUser } from '@rds-auth/state/auth.selectors';
import { SchoolService } from '@rds-school/services/school.service';
import { AppState } from '@rds-store/app.state';
import { Grade } from '@rds-user/models/grade.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-grades-printable',
  templateUrl: './user-grades-printable.component.html',
  styleUrls: ['./user-grades-printable.component.scss'],
})
export class UserGradesPrintableComponent implements OnInit {
  user$: Observable<User>;
  today: Date = new Date();
  scores: Observable<Grade> | undefined;
  constructor(
    private store: Store<AppState>,
    private schoolService: SchoolService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.scores = this.schoolService.getCurrentScore(user.id);
    });
  }
}
