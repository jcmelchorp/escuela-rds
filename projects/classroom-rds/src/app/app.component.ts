import { Component, OnInit } from '@angular/core';

import { SeoService } from './shared/services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Escuela Rafael Díaz Serdán';
  constructor(
    private seoService: SeoService,
  ) { }

  ngOnInit(): void {
    this.seoService.titleInit();
    this.seoService.generateTags({
      title: this.title,
      description: 'Aplicación de servicios escolares de la Escuela Rafael Díaz Serdán - Educación para la vida. Ubicada en la ciudad y puerto de Veracruz, México',
      image: 'assets/screenshots/screenshot02.png'
    });
  }

}
