import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKajianComponent } from './detail-kajian.component';

describe('DetailKajianComponent', () => {
  let component: DetailKajianComponent;
  let fixture: ComponentFixture<DetailKajianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailKajianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailKajianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
