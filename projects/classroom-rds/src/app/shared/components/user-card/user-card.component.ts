import { Component, Input, OnInit } from '@angular/core';

import { User } from '@rds-auth/models/user.model';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Input() isAdmin: boolean;
  @Input() isOnline: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
