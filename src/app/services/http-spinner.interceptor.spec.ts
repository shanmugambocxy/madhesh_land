import { TestBed } from '@angular/core/testing';

import { HttpSpinnerInterceptor } from './http-spinner.interceptor';

describe('HttpSpinnerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpSpinnerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpSpinnerInterceptor = TestBed.inject(HttpSpinnerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
