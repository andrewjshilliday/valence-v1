import { TestBed, async, inject } from '@angular/core/testing';

import { SearchResultsGuard } from './search-results.guard';

describe('SearchResultsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchResultsGuard]
    });
  });

  it('should ...', inject([SearchResultsGuard], (guard: SearchResultsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
