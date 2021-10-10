import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {
  faTrashAlt,
  faPlus,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import states from './states.json';
import { PhoneType } from '@rds-auth/models/user-parent.model';
import { User } from '@rds-auth/models/user.model';
import { flyInOut } from '@rds-shared/animations/fade-in.animation';
import { UserEntityService } from '@rds-store/user/user-entity.service';

@Component({
  selector: 'app-school-user',
  templateUrl: './school-user.component.html',
  styleUrls: ['./school-user.component.scss'],
  animations: [flyInOut], //[@flyInOut]="'flyInOut'"
})
export class SchoolUserComponent implements OnInit {
  user$: Observable<User>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  phoneKeys;
  phoneEnum = PhoneType;
  statesNames: string[];
  municipiosNames: string[];
  userForm: FormGroup;
  parentForm: FormGroup;
  showParentForm = false;
  raisedElev: number = 12;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faChevronLeft = faChevronLeft;
  userId: string;
  constructor(
    private route: ActivatedRoute,
    private userEntityService: UserEntityService,
    private fb: FormBuilder
  ) {
    this.userId = this.route.snapshot.params.id;
    this.statesNames = Object.keys(states);
    this.phoneKeys = Object.keys(this.phoneEnum).filter(Number);
    this.loaded$ = this.userEntityService.loaded$;
    this.loading$ = this.userEntityService.loading$;
  }

  ngOnInit() {
    this.user$ = this.userEntityService.entities$.pipe(
      map((users) => {
        const user = users.find((u) => u.id == this.userId);
        user.role == 'alumnos'
          ? this.fillStudentForm(user)
          : this.fillUserForm(user);
        return user;
      })
    );
  }
  fillStudentForm(user?: Partial<User>) {
    this.userForm = this.fb.group({
      curp: new FormControl(user.curp),
      niev: new FormControl(user.niev),
      dob: new FormControl(new Date(user.dob)),
      primaryEmail: new FormControl(user.primaryEmail),
      familyName: new FormControl(user.name.familyName),
      givenName: new FormControl(user.name.givenName),
      gender: new FormControl(user.gender),
      parents: this.fb.array(
        user.parents.map((parent) => this.setParent(parent))
      ),
    });
  }
  fillUserForm(user?: Partial<User>) {
    this.userForm = this.fb.group({
      curp: new FormControl(user.curp),
      rfc: new FormControl(user.rfc),
      dob: new FormControl(new Date(user.dob)),
      primaryEmail: new FormControl(user.primaryEmail),
      familyName: new FormControl(user.name.familyName),
      givenName: new FormControl(user.name.givenName),
      gender: new FormControl(user.gender),
    });
  }

  onSubmit() {
    // get only updated values
    const postUser: Partial<User> = {};
    this.userForm['_forEachChild']((control, name) => {
      if (control.dirty) {
        if (name != 'familyName' && name != 'givenName') {
          postUser[name] = control.value;
        }
      } else {
        if (name == 'familyName') postUser.name.familyName = control.value;
        if (name == 'givenName') postUser.name.givenName = control.value;
      }
      if (name == 'role') postUser[name] = control.value.toLowerCase();
      postUser['id'] = this.userId;
    });

    console.log(postUser);
    this.userEntityService.update(postUser);
  }
  onEstadoChange(estado) {
    this.municipiosNames = Object.values(states[estado]);
  }

  get parents(): FormArray {
    return this.userForm.get('parents') as FormArray;
  }
  newParent(): FormGroup {
    return this.fb.group({
      userId: '',
      givenName: '',
      familyName: '',
      curp: '',
      gender: '',
      relationType: '',
      relationCustom: '',
      phones: [],
      email: '',
      streetAddress: '',
      neighborhood: '',
      city: '',
      postalCode: '',
      municipio: '',
      state: '',
    });
  }
  setParent(parent): FormGroup {
    return this.fb.group({
      userId: '',
      givenName: [parent.givenName],
      familyName: [parent.familyName],
      curp: [parent.curp],
      gender: [parent.gender],
      relationType: [parent.relationType],
      relationCustom: [parent.relationCustom],
      phones: [],
      email: [parent.email],
      streetAddress: [parent.streetAddress],
      neighborhood: [parent.neighborhood],
      city: [parent.city],
      postalCode: [parent.postalCode],
      municipio: [parent.municipio],
      state: [parent.state],
    });
  }
  addParent() {
    this.parents.push(this.newParent());
  }
  removeParent(j: number) {
    this.parents.removeAt(j);
  }
  get phones(): FormArray {
    return this.parents.get('phones') as FormArray;
  }
  newPhone(): FormGroup {
    return this.fb.group({
      value: '',
      type: '',
      primary: '',
      customType: '',
    });
  }
  addPhone() {
    this.phones.push(this.newPhone());
  }
  removePhone(i: number) {
    this.phones.removeAt(i);
  }
}
