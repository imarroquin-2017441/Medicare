import { TestBed } from '@angular/core/testing';

import { MedicamentosRestService } from './medicamentos-rest.service';

describe('MedicamentosRestService', () => {
  let service: MedicamentosRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicamentosRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
