import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

import { Subscription } from 'rxjs';

import { SnackbarService } from '../../services';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('state', [
      transition(':enter', [
        style({ bottom: '-100px', transform: 'translate(-50%, 0%) scale(0.3)' }),
        animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({
          transform: 'translate(-50%, 0%) scale(1)',
          opacity: 1,
          bottom: '20px'
        })),
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0.0, 1, 1)', style({
          transform: 'translate(-50%, 0%) scale(0.3)',
          opacity: 0,
          bottom: '-100px'
        }))
      ])
    ])
  ]
})




export class SnackbarComponent implements OnInit, OnDestroy {


  show = true;
  private message: string = 'This is snackbar';
  private type: string = 'success';
  private snackbarSubscription: Subscription;

  constructor(private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.snackbarSubscription = this.snackbarService.snackbarState
      .subscribe(
        (state) => {
          if (state.type) {
            this.type = state.type;
          } else {
            this.type = 'success';
          }
          this.message = state.message;
          this.show = state.show;
          setTimeout(() => {
            this.show = false;
          }, 3000);
        });
  }

  ngOnDestroy() {
    this.snackbarSubscription.unsubscribe();
  }





}

