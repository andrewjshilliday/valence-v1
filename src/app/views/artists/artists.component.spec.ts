import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArtistsComponent } from './artists.component';

describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ArtistsComponent ],
      providers: [ { provide: MatSnackBar, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
