import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ { provide: MatSnackBar, useValue: {} } ]
  }));

  it('should be created', () => {
    const service: PlayerService = TestBed.get(PlayerService);
    expect(service).toBeTruthy();
  });
});
