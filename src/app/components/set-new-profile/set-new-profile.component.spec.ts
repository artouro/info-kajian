import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNewProfileComponent } from './set-new-profile.component';

describe('SetNewProfileComponent', () => {
  let component: SetNewProfileComponent;
  let fixture: ComponentFixture<SetNewProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetNewProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
