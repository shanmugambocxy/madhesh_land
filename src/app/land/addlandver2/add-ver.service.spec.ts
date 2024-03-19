import { TestBed } from '@angular/core/testing';

import { AddVerService } from './add-ver.service';

describe('AddVerService', () => {
  let service: AddVerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddVerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
