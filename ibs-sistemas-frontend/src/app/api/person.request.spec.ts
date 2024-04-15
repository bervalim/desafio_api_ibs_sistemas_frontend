import { TestBed } from '@angular/core/testing';

import { PersonRequest } from './person.request';

describe('PersonService', () => {
  let service: PersonRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
