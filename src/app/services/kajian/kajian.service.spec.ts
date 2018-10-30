import { TestBed } from '@angular/core/testing';

import { KajianService } from './kajian.service';

describe('KajianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KajianService = TestBed.get(KajianService);
    expect(service).toBeTruthy();
  });
});
