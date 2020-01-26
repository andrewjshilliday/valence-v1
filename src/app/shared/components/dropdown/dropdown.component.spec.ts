import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ DropdownComponent ],
      providers: [ { provide: MatSnackBar, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line: no-use-before-declare
    component.item = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const data = {
  'id': '1447538302',
  'type': 'songs',
  'href': '/v1/catalog/gb/songs/1447538302',
  'attributes': {
    'artwork': {
      'width': 1500,
      'height': 1500,
      'url': 'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/49/b1/57/49b15771-38c4-e54f-0971-3719826b9417/093624902263.jpg/{w}x{h}bb.jpeg',
      'bgColor': 'f3f3f5',
      'textColor1': '0d1116',
      'textColor2': '161b1e',
      'textColor3': '3b3e43',
      'textColor4': '424649'
    },
    'artistName': 'Gary Clark Jr.',
    'url': 'https://music.apple.com/gb/album/what-about-us/1447538299?i=1447538302',
    'discNumber': 1,
    'genreNames': [
      'Rock',
      'Music'
    ],
    'durationInMillis': 270067,
    'releaseDate': '2019-02-22',
    'name': 'What About Us',
    'isrc': 'USWB11802270',
    'hasLyrics': true,
    'albumName': 'This Land',
    'playParams': {
      'id': '1447538302',
      'kind': 'song'
    },
    'trackNumber': 2,
    'composerName': 'Gary Clark Jr. & Curtis Ousley'
  }
};
