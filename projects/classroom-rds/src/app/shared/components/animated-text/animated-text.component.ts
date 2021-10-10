import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

export const fadeInOutTimeout = 3000;
export const fadeInOut = trigger('fadeInOut', [
  transition('void => *', [style({ opacity: '0', transform: 'translateX(-50%)' }), animate(fadeInOutTimeout)]),
  transition('* => void', [animate(fadeInOutTimeout, style({ opacity: '0' }))]),
  transition('* => *', [
    style({ opacity: '0', transform: 'translateX(-50%)' }),
    animate(fadeInOutTimeout, style({ opacity: '1', transform: 'translateX(0%)' })),
  ]),
]);

@Component({
  selector: 'app-animated-text',
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss'],
  animations: [fadeInOut],
})
export class AnimatedTextComponent {
  @Input() text: string;
}
