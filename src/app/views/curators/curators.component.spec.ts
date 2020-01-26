import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuratorsComponent } from './curators.component';

describe('CuratorsComponent', () => {
  let component: CuratorsComponent;
  let fixture: ComponentFixture<CuratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ CuratorsComponent ],
      providers: [ { provide: MatSnackBar, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
