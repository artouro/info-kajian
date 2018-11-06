import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajelisComponent } from './majelis.component';

describe('MajelisComponent', () => {
  let component: MajelisComponent;
  let fixture: ComponentFixture<MajelisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajelisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
