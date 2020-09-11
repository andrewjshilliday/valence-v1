import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaItemViewComponent } from './media-item-view.component';

describe('MediaItemViewComponent', () => {
  let component: MediaItemViewComponent;
  let fixture: ComponentFixture<MediaItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ MediaItemViewComponent ],
      providers: [ { provide: MatSnackBar, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemViewComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line: no-use-before-declare
    component.item = data;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});

const data = {
  'id': '388127285',
  'type': 'albums',
  'href': '/v1/catalog/gb/albums/388127285',
  'attributes': {
    'artwork': {
      'width': 1500,
      'height': 1500,
      'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music19/v4/b0/25/f6/b025f656-38f1-2c8f-7212-290fbacbdd3a/dj.rengmjbv.jpg/{w}x{h}bb.jpeg',
      'bgColor': '010104',
      'textColor1': 'ffffff',
      'textColor2': 'd7d2ce',
      'textColor3': 'cccccc',
      'textColor4': 'aca8a6'
    },
    'artistName': 'John Mayer',
    'isSingle': false,
    'url': 'https://music.apple.com/gb/album/where-the-light-is-john-mayer-live-in-los-angeles/388127285',
    'isComplete': true,
    'genreNames': [
      'Pop',
      'Music',
      'Rock',
      'Adult Alternative',
      'Pop/Rock',
      'Blues-Rock'
    ],
    'trackCount': 22,
    'isMasteredForItunes': false,
    'releaseDate': '2008-07-01',
    'name': 'Where the Light Is: John Mayer Live in Los Angeles',
    'recordLabel': 'Columbia',
    'copyright': '℗ 2008 Sony Music Entertainment',
    'playParams': {
      'id': '388127285',
      'kind': 'album'
    },
    'editorialNotes': {
      'name': 'Where the Light Is: Live In Los Angeles',
      'standard': 'John Mayer’s 2007 live act is presented here as a three-act play; there’s the nimble acoustic set, with both fingerstyle folk (“Stop This Train”) and gently-swung pop (“Daughters”); then there’s the John Mayer Trio set, in which he plays blues (“Out of My Mind”), urgent funk rock (“Who Did You Think I Was”) and soul (“Vultures”). The finale brings out his full band, adding saxophone filigrees (“I Don’t Need No Doctor”), warm organ, and extra harmonies to what is always a very tasteful and uncluttered sound.',
      'short': 'A concert full of sparkling highlights from the emotive singer/songwriter.'
    }
  },
  'relationships': {
    'artists': {
      'data': [{
          'id': '472054',
          'type': 'artists',
          'href': '/v1/catalog/gb/artists/472054'
        }
      ],
      'href': '/v1/catalog/gb/albums/388127285/artists'
    }
  }
};
