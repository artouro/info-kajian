import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KajianComponent } from './kajian.component';

describe('KajianComponent', () => {
  let component: KajianComponent;
  let fixture: ComponentFixture<KajianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KajianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KajianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
