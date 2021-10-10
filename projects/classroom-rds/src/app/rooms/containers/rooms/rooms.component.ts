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
import { map, mergeMap, tap } from 'rxjs/operators';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { RoomDialogComponent } from '../../components/room-dialog/room-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { User } from '@rds-auth/models/user.model';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  periodsForm: FormGroup;
  periods$: Observable<string[]>;
  rooms$: Observable<Room[]>;
  sub: Subscription;
  roomsCount: number;
  rooms: Room[];
  faPlus = faPlus;
  faEdit = faEdit;
  faGripVertical = faGripVertical;
  faUserGraduate = faUserGraduate;
  selected = '20202021';
  periodControl: FormControl = new FormControl(this.selected);
  constructor(
    private toastr: ToastrService,
    private roomService: RoomService,
    private userEntityService: UserEntityService,
    public dialog: MatDialog
  ) {
    this.periods$ = this.roomService.getPeriods();
  }

  ngOnInit(): void {
    this.onCicleSelect(this.selected);
  }

  onCicleSelect(period: string): void {
    this.rooms$ = this.roomService.getRoomsOnCicle(period).pipe(
      tap((rooms) => (this.roomsCount = rooms.length)),
      mergeMap((rooms: Room[]) =>
        this.userEntityService.entities$.pipe(
          map((users: User[]) => {
            const allRooms = rooms.map((room: Room) => {
              const courses = room.courses.map((course: CourseRoom) => {
                return {
                  ...course,
                  mainTeacher: users.find((u) => u.id == course.mainTeacherId),
                  grade: room.grade,
                };
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
              return { ...room, courses: courses, students: students };
            });
            return allRooms;
          })
        )
      )
    );
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
