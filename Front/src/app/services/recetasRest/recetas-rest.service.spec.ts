import { TestBed } from '@angular/core/testing';

import { RecetasRestService } from './recetas-rest.service';

describe('RecetasRestService', () => {
  let service: RecetasRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetasRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
