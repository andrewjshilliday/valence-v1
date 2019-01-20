import { TestBed, async, inject } from '@angular/core/testing';
import { SearchGuard } from './search.guard';

describe('SearchGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchGuard]
    });
  });

  it('should ...', inject([SearchGuard], (guard: SearchGuard) => {
    expect(guard).toBeTruthy();
  }));
});
