import { TestBed } from '@angular/core/testing';

import { ViacepRequest } from './viacep.request';

describe('ViacepService', () => {
  let service: ViacepRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViacepRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
