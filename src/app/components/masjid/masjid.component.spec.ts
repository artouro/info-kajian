import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasjidComponent } from './masjid.component';

describe('MasjidComponent', () => {
  let component: MasjidComponent;
  let fixture: ComponentFixture<MasjidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasjidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasjidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
