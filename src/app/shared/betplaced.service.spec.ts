import { TestBed } from '@angular/core/testing';

import { BetplacedService } from './betplaced.service';

describe('BetplacedService', () => {
  let service: BetplacedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetplacedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
