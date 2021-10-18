import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import {
  faUsers,
  faUserTie,
  faUserPlus,
  faIdCardAlt,
  faSchool,
  faBook,
  faTools,
} from '@fortawesome/free-solid-svg-icons';
import { fadeInAnimation } from '@rds-shared/animations/fade-in.animation';

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['./school-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation], //[@fadeIn]="'fadeIn'"
})
export class SchoolDashboardComponent implements OnInit {
  faIdCard = faIdCard;
  faIdCardAlt = faIdCardAlt;
  faUserTie = faUserTie;
  faUserPlus = faUserPlus;
  faTools = faTools;
  raisedElev: number = 12;
  assigmentLinks: any[];
  constructor() { }

  ngOnInit(): void {
    this.assigmentLinks = [
      {
        title: 'Usuarios',
        description: 'Información sobre alumnos, maestros y personal.',
        route: 'usuarios',
        icon: faUsers,
      },
      {
        title: 'Grupos',
        description: 'Administra materias y grupos.',
        route: 'grupos',
        icon: faSchool,
      },
      {
        title: 'Materias',
        description: 'Materias y clases dentro de la institución',
        route: 'materias',
        icon: faBook,
      },
      {
        title: 'Configuración',
        description: 'Servicios de configuración y base de datos',
        route: 'playground',
        icon: faTools,
      },
    ];
  }
}
