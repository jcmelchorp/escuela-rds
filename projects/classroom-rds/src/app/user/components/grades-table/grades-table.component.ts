import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

import { faComments } from '@fortawesome/free-regular-svg-icons';

import { Grade, Score } from '../../models/grade.model';

import { ScoreDataSource } from './score-datasource';


@Component({
  selector: 'app-grades-table',
  templateUrl: './grades-table.component.html',
  styleUrls: ['./grades-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GradesTableComponent implements OnInit {
  @Input() data: Grade;
  copyData: Score[];
  extraData: Score[];
  avgData: Score;
  faComments = faComments;
  displayedColumns = ['courseName', 'unit1', 'unit2', 'unit3', 'final'];
  optative: ScoreDataSource;
  formative: ScoreDataSource;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  ngOnInit() {
    this.copyData = [...this.data.scores];
    this.formative = new ScoreDataSource(this.copyData);
    this.avgData = this.copyData.splice(-1, 1).pop();
    this.extraData = this.copyData.splice(-2, 2);
    this.optative = new ScoreDataSource(this.extraData)
  }

  getAverage() {
    let sum1: number = 0;
    let sum2: number = 0;
    let sum3: number = 0;
    let sum4: number = 0;

    let count = 0;
    this.copyData.forEach(score => {
      sum1 = + score.unit1 + sum1;
      sum2 = + score.unit2 + sum2;
      sum3 = + score.unit3 + sum3;
      sum4 = + score.final + sum4;
      count++;
    });
    const avg1 = (Math.trunc(10 * (sum1 / count)) / 10).toString();
    const avg2 = (Math.trunc(10 * (sum2 / count)) / 10).toString();
    const avg3 = (Math.trunc(10 * (sum3 / count)) / 10).toString();
    const avg4 = (Math.trunc(10 * (sum4 / count)) / 10).toString();
    return [avg1, avg2, avg3, avg4]
  }


}
