import { TestBed } from '@angular/core/testing';

import { CategoryCheckResolver } from './category-check.resolver';

describe('CategoryCheckResolver', () => {
  let resolver: CategoryCheckResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoryCheckResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
