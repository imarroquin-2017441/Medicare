import { TestBed } from '@angular/core/testing';

import { MisRecetasRestService } from './mis-recetas-rest.service';

describe('MisRecetasRestService', () => {
  let service: MisRecetasRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisRecetasRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
