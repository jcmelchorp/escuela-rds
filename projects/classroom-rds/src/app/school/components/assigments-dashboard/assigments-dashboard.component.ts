import { Component, OnInit } from '@angular/core';

import { faBook, faBookReader, faUserPlus, faUsers, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-assigments-dashboard',
  templateUrl: './assigments-dashboard.component.html',
  styleUrls: ['./assigments-dashboard.component.scss']
})
export class AssigmentsDashboardComponent implements OnInit {
  raisedElev: number = 12;
  assigmentLinks: any[];
  ngOnInit(): void {
    this.assigmentLinks = [
      {
        title: 'Grupos',
        description: 'Integra maestros y alumnos en grados escolares.',
        route: 'rooms',
        icon: faChalkboardTeacher
      },
      {
        title: 'Materias',
        description: 'Administra las materias que se imparten en cada grupo',
        route: 'materias',
        icon: faBookReader
      }
    ]
  }

}
