import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grade-recomendation',
  templateUrl: './grade-recomendation.component.html',
  styleUrls: ['./grade-recomendation.component.scss']
})
export class GradeRecomendationComponent implements OnInit {
  @Input() data: string[];
  raisedElev: number = 10;
  recomendation: string[];
  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      this.recomendation = [...this.data.filter(r => r != null)];
    }
  }

}
