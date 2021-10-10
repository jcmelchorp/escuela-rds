import { Component, Input, OnInit } from '@angular/core';

import { faFacebook, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() isHandset: boolean;
  socialSet: any[] = [
    /*  {
       name: 'Github',
       icon: faGithub,
       site: 'https://github.com/jcmelchorp/classroom-rds',
     }, */
    {
      name: 'Facebook',
      icon: faFacebook,
      site: 'https://www.facebook.com/RDSLaFallito',
    },
    {
      name: 'Twitter',
      icon: faTwitter,
      site: 'https://twitter.com/Escuela_RDS',
    }
  ];


}
