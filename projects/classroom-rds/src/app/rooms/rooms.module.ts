import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UsersResolver } from './../school/services/users.resolver';
import { CourseRoomResolver } from '../subjects/services/course-room.resolver';
import { UserProfilesService } from '../classroom/user-profiles/services/user-profiles.service';

import { roomsComponents } from './components';
import { roomsContainers } from './containers';
import { RoomsRoutingModule } from './rooms-routing.module';

import { RoomService } from './services/room.service';

@NgModule({
  declarations: [...roomsComponents, ...roomsContainers],
  imports: [SharedModule, RoomsRoutingModule],
  providers: [RoomService, UserProfilesService],
})
export class RoomsModule {}
