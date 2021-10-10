import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAnimateComponent } from './logo-animate.component';

describe('LogoAnimateComponent', () => {
  let component: LogoAnimateComponent;
  let fixture: ComponentFixture<LogoAnimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoAnimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoAnimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
