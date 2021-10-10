import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingOnGradesComponent } from './working-on-grades.component';

describe('WorkingOnGradesComponent', () => {
  let component: WorkingOnGradesComponent;
  let fixture: ComponentFixture<WorkingOnGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingOnGradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingOnGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
