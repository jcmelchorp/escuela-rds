import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { GroupEntityService } from '@rds-admin/state/group/group-entity.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Group } from '@rds-admin/models/users-domain.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  groups$: Observable<Group[]>;
  loaded$: Observable<boolean>;
  constructor(private groupEntityService: GroupEntityService) {
    this.loaded$ = this.groupEntityService.loaded$;
  }
  ngOnInit(): void {
    this.groups$ = this.groupEntityService.entities$.pipe(
      map((groups) => {
        if (!groups) {
          this.groupEntityService.getAll();
        }
        return groups;
      })
    );
  }
}
