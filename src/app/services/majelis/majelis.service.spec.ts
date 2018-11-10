import { TestBed } from '@angular/core/testing';

import { MajelisService } from './majelis.service';

describe('MajelisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MajelisService = TestBed.get(MajelisService);
    expect(service).toBeTruthy();
  });
});
