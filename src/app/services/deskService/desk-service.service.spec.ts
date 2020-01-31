import { TestBed } from '@angular/core/testing';

import { DeskServiceService } from './desk-service.service';

describe('DeskServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeskServiceService = TestBed.get(DeskServiceService);
    expect(service).toBeTruthy();
  });
});
