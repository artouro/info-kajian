import { TestBed } from '@angular/core/testing';

import { PemateriService } from './pemateri.service';

describe('PemateriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PemateriService = TestBed.get(PemateriService);
    expect(service).toBeTruthy();
  });
});
