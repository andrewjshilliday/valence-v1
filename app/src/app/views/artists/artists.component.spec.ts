import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArtistsComponent } from './artists.component';
import { environment } from '../../../environments/environment';

describe('ArtistsComponent', () => {
  let params: Subject<Params>;
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;

  beforeAll(async() => {
    environment.appleMusicDevToken =
      await fetch(`https://ut8obu95ge.execute-api.eu-west-1.amazonaws.com/dev/auth?service=apple-music`)
        .then(response => response.json())
        .then​(body => body.access_token);
  });

  beforeEach(async(() => {
    params = new BehaviorSubject<Params>({ 'id': '266463936' });
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ArtistsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: params } },
        { provide: MatSnackBar, useValue: {} }
      ]
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
