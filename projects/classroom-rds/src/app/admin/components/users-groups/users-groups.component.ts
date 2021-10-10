import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { UserDomain } from '@rds-admin/models/users-domain.model';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.scss'],
})
export class UsersGroupsComponent implements OnInit {
  @Input() users: UserDomain[];
  unassignedList: UserDomain[] = [];
  @Output() groupList: EventEmitter<UserDomain>;
  constructor() {}

  ngOnInit(): void {}
  drop(event: CdkDragDrop<UserDomain[]>): void {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
  }
}
