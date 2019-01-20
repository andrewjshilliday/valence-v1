import { TestBed } from '@angular/core/testing';
import { MusicPlayerService } from './music-player.service';

describe('MusicPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicPlayerService = TestBed.get(MusicPlayerService);
    expect(service).toBeTruthy();
  });
});
