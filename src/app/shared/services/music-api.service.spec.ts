import { TestBed } from '@angular/core/testing';
import { MusicApiService } from './music-api.service';

describe('MusicApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicApiService = TestBed.get(MusicApiService);
    expect(service).toBeTruthy();
  });
});
