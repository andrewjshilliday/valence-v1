import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ { provide: MatSnackBar, useValue: {} } ]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
