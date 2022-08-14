import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorShowComponent } from './doctor-show.component';

describe('DoctorShowComponent', () => {
  let component: DoctorShowComponent;
  let fixture: ComponentFixture<DoctorShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
