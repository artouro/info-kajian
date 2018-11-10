import { TestBed } from '@angular/core/testing';

import { MasjidService } from './masjid.service';

describe('MasjidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasjidService = TestBed.get(MasjidService);
    expect(service).toBeTruthy();
  });
});
