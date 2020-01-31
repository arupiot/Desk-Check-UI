import { TestBed, async, inject } from '@angular/core/testing';

import { FmGuard } from './fm.guard';

describe('FmGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FmGuard]
    });
  });

  it('should ...', inject([FmGuard], (guard: FmGuard) => {
    expect(guard).toBeTruthy();
  }));
});
