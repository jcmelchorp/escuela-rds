import { Component, Input, OnInit } from '@angular/core';

import { flyInOut, fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {
  @Input() isOnline: boolean;
}
