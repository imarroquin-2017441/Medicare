import { TestBed } from '@angular/core/testing';

import { UserAService } from './user-a.service';

describe('UserAService', () => {
  let service: UserAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
