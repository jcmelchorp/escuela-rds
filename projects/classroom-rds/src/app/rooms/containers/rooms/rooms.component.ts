import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import {
  faGripVertical,
  faPlus,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { RoomDialogComponent } from '../../components/room-dialog/room-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { User } from '@rds-auth/models/user.model';
import { defaultPeriod } from '../../../core/state/core.selectors';
import { AppState } from '../../../store/app.state';
import { select, Store } from '@ngrx/store';
import { SubscriptionService } from '../../../shared/services/subscription.service';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  periodsForm: FormGroup;
  periods$: Observable<string[]>;
  rooms$: Observable<Room[][]>;
  sub: Subscription;
  roomsCount: number;
  rooms: Room[];
  faPlus = faPlus;
  faEdit = faEdit;
  faGripVertical = faGripVertical;
  faUserGraduate = faUserGraduate;
  selected: string;
  selected$: Observable<string>;
  constructor(
    private toastr: ToastrService,
    private roomService: RoomService,
    private userEntityService: UserEntityService,
    private store: Store<AppState>,
    private subscription: SubscriptionService,
    public dialog: MatDialog
  ) {
    this.store.pipe(select(defaultPeriod)).subscribe(selected => this.selected = selected.id);
    this.periods$ = this.roomService.getPeriods();

  }

  ngOnInit(): void {
    this.onCicleSelect(this.selected);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribeComponent$;
  }
  onCicleSelect(event): void {
    this.rooms$ = this.roomService.getRoomsOnCicle(event).pipe(
      tap((rooms) => (this.roomsCount = rooms.length)),
      mergeMap((rooms: Room[]) =>
        this.userEntityService.entities$.pipe(
          map((users: User[]) => {
            const allRooms = rooms.map((room: Room) => {
              const courses = room.courses.sort(this.sortByPriority).map((course: CourseRoom) => {
                return {
                  ...course,
                  mainTeacher: users.find((u) => u.id == course.mainTeacherId),
                  grade: room.grade,
                } as CourseRoom;
              });
              const students = room.students.map((student) => {
                const studentUser = users.find((u) => u.id == student.id);
                return {
                  ...student,
                  name: {
                    familyName: studentUser.name.familyName,
                    givenName: studentUser.name.givenName,
                    fullName: studentUser.name.fullName,
                  },
                  primaryEmail: studentUser.primaryEmail,
                };
              });
              console.log(students);
              return { ...room, courses: courses, students: students } as Room;
            });
            return allRooms;
          })
        )
      ),
      map(rooms => [
        rooms.filter(room => room.grade.toString().includes('Preescolar')),
        rooms.filter(room => room.grade.toString().includes('Primaria')),
        rooms.filter(room => room.grade.toString().includes('Secundaria')),
      ])
    );

  }
  sortByPriority = (a: CourseRoom, b: CourseRoom) => {
    if (a.priority < b.priority) {
      return -1;
    } else if (a.priority > b.priority) {
      return 1;
    } else {
      return 0;
    }
  }
  roomsDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.rooms, event.previousIndex, event.currentIndex);
    this.rooms.forEach((room) =>
      this.roomService.updateRoom({ id: room.id, priority: room.priority })
    );
  }

  openRoomDialog(room?: Room, idx?: number): void {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: '450px',
      data: room
        ? { room: { ...room }, isNew: false, idx }
        : { room: {}, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.roomService
            .createRoom({
              ...result.room,
              id: '',
              priority: this.roomsCount,
              students: [],
              courses: [],
            })
            .subscribe(
              (room) =>
                this.toastr.success(
                  `Se ha creado ${room.name} con éxito`,
                  `Sistema RDS`
                ),
              (error) =>
                this.toastr.error(
                  `Ocurrió un error al guardar ${room.name} en el sistema`,
                  `Error: ${error.code}`
                )
            );
        } else {
          this.roomService.updateRoom(result.room).then(
            () =>
              this.toastr.success(
                `Se ha modificado ${room.name} con éxito`,
                `Sistema RDS`
              ),
            (error) =>
              this.toastr.error(
                `Ocurrió un error al actualizar ${room.name} en el sistema`,
                `Error: ${error.code}`
              )
          );
        }
      }
    });
  }

}
