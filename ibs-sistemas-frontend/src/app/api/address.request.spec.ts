import { TestBed } from '@angular/core/testing';
import { AddressRequest } from './address.request';

describe('AddressRequest', () => {
  let service: AddressRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
