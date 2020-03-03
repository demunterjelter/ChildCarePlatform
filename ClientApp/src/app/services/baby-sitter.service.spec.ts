import { TestBed } from '@angular/core/testing';

import { BabySitterService } from './baby-sitter.service';

describe('BabySitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BabySitterService = TestBed.get(BabySitterService);
    expect(service).toBeTruthy();
  });
});
