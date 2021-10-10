import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { StudentEntityService } from '@rds-store/student/student-entity.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentGrade } from '../../models/student-grade.model';

@Component({
  selector: 'app-grade-course',
  templateUrl: './grade-course.component.html',
  styleUrls: ['./grade-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradeCourseComponent implements OnInit {
  students$: Observable<gapi.client.classroom.Student[]>;
  courseId: string;
  loading$: Observable<boolean>;
  faBlind = faBlind;
  eventGrade: StudentGrade;
  courseGrade: StudentGrade[];
  characters$: Observable<StudentGrade[]>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private studentEntityService: StudentEntityService
  ) {
    this.route.paramMap.subscribe(
      (params) => (this.courseId = params.get('courseId'))
    );
    this.loading$ = this.studentEntityService.loading$;
    this.students$ = this.studentEntityService.entities$.pipe(
      map((students) => {
        if (!students) {
          this.studentEntityService.getWithQuery(this.courseId);
        }
        return students.filter((x) => x.courseId == this.courseId);
      })
    );

    this.students$.subscribe((students) => {
      this.courseGrade = [];
      students.map((student) => {});
    });
  }
  ngOnInit(): void {}
}
