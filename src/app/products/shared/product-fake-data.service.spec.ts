import { TestBed } from '@angular/core/testing';

import { ProductFakeDataService } from './product-fake-data.service';

describe('ProductFakeDataService', () => {
  let service: ProductFakeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFakeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
