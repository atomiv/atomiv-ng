import { TestBed } from '@angular/core/testing';

import { CustomerFakeDataService } from './customer-fake-data.service';

describe('CustomerFakeDataService', () => {
  let service: CustomerFakeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerFakeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
