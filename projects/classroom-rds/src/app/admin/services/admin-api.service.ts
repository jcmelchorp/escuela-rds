import { Injectable } from '@angular/core';

import { QueryParams } from '@ngrx/data';

import { environment } from '@rds-env/environment';

import { UserDomain, UserResponse } from '@rds-admin/models/users-domain.model';

import { GroupResponse } from '../models/users-domain.model';

declare var gapi: any;
@Injectable()
export class AdminApiService {
  private _googleAuth: gapi.auth2.GoogleAuth;
  private _googleUser: gapi.auth2.GoogleUser;
  constructor() {}
  private hasAccessScopes(googleAuth: gapi.auth2.GoogleAuth): boolean {
    return (
      googleAuth &&
      googleAuth.currentUser
        .get()
        .hasGrantedScopes(environment.gapi.adminScopes)
    );
  }
  async handleAdminLoad(): Promise<void> {
    // Retrieve the GoogleUser object for the current user.
    this._googleAuth = gapi.auth2.getAuthInstance();
    this._googleUser = this._googleAuth.currentUser.get();
    const isAuthorized = this.hasAccessScopes(this._googleAuth);
    if (!isAuthorized) {
      const option: gapi.auth2.SigninOptionsBuilder =
        new gapi.auth2.SigninOptionsBuilder();
      option.setScope(environment.gapi.adminScopes);
      this._googleUser.grant(option).then(
        (success) => {
          //alert(JSON.stringify({ message: "success", value: success }));
        },
        (fail) => {
          confirm(JSON.stringify({ message: 'fail', value: fail }));
        }
      );
    }
    gapi.client.load('admin', 'directory_v1', () => {
      // alert('loaded classroom');
    });
  }
  /* handleAdminLoad() {
    // Retrieve the GoogleUser object for the current user.
     this._googleAuth = gapi.auth2.getAuthInstance();
    this._googleUser = this._googleAuth.currentUser.get();
    const googleAuth: gapi.auth2.GoogleAuth = gapi.auth2.getAuthInstance();
    const googleUser: gapi.auth2.GoogleUser = googleAuth.currentUser.get();
    const isAuthorized = googleUser.hasGrantedScopes(environment.gapi.adminScopes);
    if (!isAuthorized) {
      const option: gapi.auth2.SigninOptionsBuilder = new gapi.auth2.SigninOptionsBuilder();
      option.setScope(environment.gapi.adminScopes);
      googleUser.grant(option).then(
        (success) => {
          //alert(JSON.stringify({ message: "success", value: success }));
        },
        (fail) => {
          confirm(JSON.stringify({ message: 'fail', value: fail }));
        });
      gapi.client.load('admin', 'directory_v1', () => {
        //alert('loaded admin directory');
      });
    }
  } */

  async addUser(user: Partial<UserDomain>) {
    const response: gapi.client.Response<any> =
      await gapi.client.directory.users.insert({
        password: user.password,
        primaryEmail: user.primaryEmail,
        name: {
          givenName: user.name.givenName,
          familyName: user.name.familyName,
        },
        changePasswordAtNextLogin: false,
        orgUnitPath: user.orgUnitPath,
      });
    return response.result;
  }

  async listAllUsers() {
    const response: gapi.client.Response<UserResponse> =
      await gapi.client.directory.users.list({
        domain: 'rafaeldiazserdan.net',
        orderBy: 'familyName',
        maxResults: 500,
      });
    return response.result.users;
  }

  async getStudents(queryParams: QueryParams) {
    const response: gapi.client.Response<UserResponse> =
      await gapi.client.directory.users.list({
        domain: 'rafaeldiazserdan.net',
        orderBy: 'familyName',
        orgPath:
          'Dirección/Alumnos/' + queryParams.level + '/' + queryParams.grade,
        maxResults: 500,
      });
    return response.result.users;
  }
  async updateUser(user: Partial<UserDomain>) {
    const response: gapi.client.Response<UserDomain> =
      await gapi.client.directory.users.update(user);
    console.log(response.result);
    return response.result;
  }

  async getUserDomain(userId: string, domain?: string) {
    const user = await gapi.client.directory.users
      .get({
        domain: domain || 'rafaeldiazserdan.net',
        userKey: userId,
      })
      .then((resp) => {
        return resp.result;
      });
    return user;
  }

  async getGroups() {
    const response: gapi.client.Response<GroupResponse> =
      await gapi.client.directory.groups.list({
        domain: 'rafaeldiazserdan.net',
      });
    return response.result.groups;
  }

  async createSchoolAnnouncement(
    announcement: gapi.client.classroom.Announcement,
    courseId: string
  ) {
    const params = { ...announcement, courseId };
    console.log(params);
    const response = await gapi.client.classroom.courses.announcements
      .create(params)
      .then((res) => {
        return res.result;
      })
      .catch((err) => {});
    console.log(response);
    return response;
  }
}
