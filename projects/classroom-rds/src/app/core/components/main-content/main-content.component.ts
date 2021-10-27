import { Component, Input, OnInit } from '@angular/core';
import { Route, Routes, Router, ActivatedRoute } from '@angular/router';

import { flyInOut, fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {
  @Input() isOnline: boolean;
  constructor() {
  }
}
