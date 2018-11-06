import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PemateriComponent } from './pemateri.component';

describe('PemateriComponent', () => {
  let component: PemateriComponent;
  let fixture: ComponentFixture<PemateriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PemateriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PemateriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
