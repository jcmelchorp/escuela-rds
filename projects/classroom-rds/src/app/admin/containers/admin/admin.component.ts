import { Component, OnInit } from '@angular/core';

import { AdminApiService } from '@rds-admin/services';
import { UserDomain } from '@rds-admin/models/users-domain.model';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  newUser: UserDomain;
  constructor(
    private adminApiService: AdminApiService,
  ) {
    this.adminApiService.handleAdminLoad();
  }

  ngOnInit(): void {

  }

}

