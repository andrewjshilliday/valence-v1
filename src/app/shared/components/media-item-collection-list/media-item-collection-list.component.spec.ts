import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaItemCollectionListComponent } from './media-item-collection-list.component';

describe('MediaItemCollectionListComponent', () => {
  let component: MediaItemCollectionListComponent;
  let fixture: ComponentFixture<MediaItemCollectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MediaItemCollectionListComponent ],
      providers: [ { provide: MatSnackBar, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemCollectionListComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line: no-use-before-declare
    component.collection = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const data = {
  'id': '184335550',
  'type': 'albums',
  'href': '/v1/catalog/gb/albums/184335550',
  'attributes': {
    'artwork': {
      'width': 1464,
      'height': 1464,
      'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
      'bgColor': '686b6e',
      'textColor1': 'eff0f0',
      'textColor2': 'e0ebe6',
      'textColor3': 'd4d5d6',
      'textColor4': 'c8d2ce'
    },
    'artistName': 'John Mayer',
    'isSingle': false,
    'url': 'https://music.apple.com/gb/album/continuum/184335550',
    'isComplete': true,
    'genreNames': [
      'Singer/Songwriter',
      'Music',
      'Rock',
      'Adult Alternative',
      'Pop',
      'Pop/Rock',
      'Singer/Songwriter',
      'Blues-Rock',
      'Arena Rock'
    ],
    'trackCount': 13,
    'isMasteredForItunes': true,
    'releaseDate': '2006-09-12',
    'name': 'Continuum',
    'recordLabel': 'Aware/Columbia',
    'copyright': '℗ 2006 Aware Records LLC',
    'playParams': {
      'id': '184335550',
      'kind': 'album'
    },
    'editorialNotes': {
      'standard': 'After throwing fans of his campfire serenades off guard with the jam-heavy live album <i>Try!</i>, <i>Continuum</i> confirms John Mayer’s transformation into a 21st-century soul man with serious blues-rock chops. And for Mayer, that shift means more than just casting his songs in a gospel glow, but also speaking to political unrest atop the laidback shuffle of “Waiting on the World to Change.” Ultimately, the growth Mayer exhibits here can be gauged not just by his shred-tastic cover of Hendrix’s “Bold as Love,” but by the fact he answers it with “Dreaming with a Broken Heart,” a lighter-waving anthem to call his own.',
      'short': 'The pop-rock pinup gets seriously soulful and soulfully serious.'
    },
    'contentRating': 'clean'
  },
  'relationships': {
    'tracks': {
      'data': [{
          'id': '184335560',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335560',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview20/v4/8e/fd/e0/8efde0e3-6967-6493-9f2d-23869174e315/mzaf_1904943406835518703.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/waiting-on-the-world-to-change/184335550?i=184335560',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 200667,
            'releaseDate': '2006-07-11',
            'name': 'Waiting On the World to Change',
            'isrc': 'USSM10602589',
            'hasLyrics': false,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335560',
              'kind': 'song'
            },
            'trackNumber': 1,
            'composerName': 'John Mayer'
          }
        }, {
          'id': '184335561',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335561',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview60/v4/85/b4/69/85b46923-6382-585a-ea19-1591e4f7f7a9/mzaf_192415018206916462.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/i-dont-trust-myself-with-loving-you/184335550?i=184335561',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 292133,
            'releaseDate': '2006-09-12',
            'name': 'I Don\'t Trust Myself (With Loving You)',
            'isrc': 'USSM10603626',
            'hasLyrics': false,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335561',
              'kind': 'song'
            },
            'trackNumber': 2,
            'composerName': 'John Mayer'
          }
        }, {
          'id': '184335659',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335659',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview20/v4/07/be/b0/07beb09a-cc5f-998f-7384-f74471beab46/mzaf_7131451648346264925.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/belief/184335550?i=184335659',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 242360,
            'releaseDate': '2006-09-12',
            'name': 'Belief',
            'isrc': 'USSM10603627',
            'hasLyrics': false,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335659',
              'kind': 'song'
            },
            'trackNumber': 3,
            'composerName': 'John Mayer'
          }
        }, {
          'id': '184335660',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335660',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview20/v4/97/4a/3e/974a3e49-b189-e403-54ed-b24fdecbb9ac/mzaf_9007814717066801739.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/gravity/184335550?i=184335660',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 245773,
            'releaseDate': '2006-09-12',
            'name': 'Gravity',
            'isrc': 'USSM10603628',
            'hasLyrics': false,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335660',
              'kind': 'song'
            },
            'trackNumber': 4,
            'composerName': 'John Mayer'
          }
        }, {
          'id': '184335728',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335728',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview30/v4/72/4b/a2/724ba2df-4bbd-fbef-9b33-5af8aa50cfae/mzaf_1994212589491483802.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/the-heart-of-life/184335550?i=184335728',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 199080,
            'releaseDate': '2006-09-12',
            'name': 'The Heart of Life',
            'isrc': 'USSM10603629',
            'hasLyrics': false,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335728',
              'kind': 'song'
            },
            'trackNumber': 5,
            'composerName': 'John Mayer'
          }
        }, {
          'id': '184335773',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335773',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview18/v4/6d/bf/a2/6dbfa2c5-700f-ff31-e5cf-ee4615978ff0/mzaf_8085456547347500497.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/vultures/184335550?i=184335773',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 251800,
            'releaseDate': '2006-08-01',
            'name': 'Vultures',
            'isrc': 'USSM10603630',
            'hasLyrics': true,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335773',
              'kind': 'song'
            },
            'trackNumber': 6,
            'composerName': 'John Mayer, Steve Jordan & Pino Palladino'
          }
        }, {
          'id': '184335777',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335777',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview60/v4/9c/6d/ef/9c6def13-2bf7-8287-e73b-639c1f35932d/mzaf_5194288165906601286.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/stop-this-train/184335550?i=184335777',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 285133,
            'releaseDate': '2006-09-12',
            'name': 'Stop This Train',
            'isrc': 'USSM10603631',
            'hasLyrics': true,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335777',
              'kind': 'song'
            },
            'trackNumber': 7,
            'composerName': 'John Mayer'
          }
        }, {
          'id': '184335793',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335793',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview20/v4/fb/53/84/fb5384cc-3e03-34a0-dc8b-f4af5c9f0d02/mzaf_8233837496864649446.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/slow-dancing-in-a-burning-room/184335550?i=184335793',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 241947,
            'releaseDate': '2006-09-12',
            'name': 'Slow Dancing In a Burning Room',
            'isrc': 'USSM10603632',
            'hasLyrics': false,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335793',
              'kind': 'song'
            },
            'trackNumber': 8,
            'composerName': 'John Mayer'
          }
        }, {
          'id': '184335816',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335816',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview18/v4/38/bf/44/38bf44c0-4b8f-0122-6361-824d87329fdb/mzaf_1182582941502370553.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/bold-as-love/184335550?i=184335816',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 258147,
            'releaseDate': '2006-09-12',
            'name': 'Bold As Love',
            'isrc': 'USSM10603633',
            'hasLyrics': false,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335816',
              'kind': 'song'
            },
            'trackNumber': 9,
            'composerName': 'Jimi Hendrix'
          }
        }, {
          'id': '184335866',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335866',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview60/v4/f1/11/71/f111714d-9b96-7759-5b27-929de58f4d16/mzaf_3551013664983726585.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/dreaming-with-a-broken-heart/184335550?i=184335866',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 247840,
            'releaseDate': '2006-09-12',
            'name': 'Dreaming With a Broken Heart',
            'isrc': 'USSM10603634',
            'hasLyrics': false,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335866',
              'kind': 'song'
            },
            'trackNumber': 10,
            'composerName': 'John Mayer'
          }
        }, {
          'id': '184335876',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335876',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview60/v4/1f/bf/22/1fbf22b2-a024-a6bc-c90e-3631f36c7de8/mzaf_8212905080565914795.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/in-repair/184335550?i=184335876',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 369827,
            'releaseDate': '2006-09-12',
            'name': 'In Repair',
            'isrc': 'USSM10603635',
            'hasLyrics': true,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335876',
              'kind': 'song'
            },
            'trackNumber': 11,
            'composerName': 'John Mayer & Charlie Hunter',
            'contentRating': 'clean'
          }
        }, {
          'id': '184335953',
          'type': 'songs',
          'href': '/v1/catalog/gb/songs/184335953',
          'attributes': {
            'previews': [{
                'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview20/v4/0f/77/d7/0f77d742-4720-23b1-9f19-737ac2e3dec5/mzaf_8374481049897822940.plus.aac.p.m4a'
              }
            ],
            'artwork': {
              'width': 1464,
              'height': 1464,
              'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/07/96/63/079663ca-60f0-9cec-41ad-ee1ccd5bb482/dj.oqpplyfm.jpg/{w}x{h}bb.jpeg',
              'bgColor': '686b6e',
              'textColor1': 'eff0f0',
              'textColor2': 'e0ebe6',
              'textColor3': 'd4d5d6',
              'textColor4': 'c8d2ce'
            },
            'artistName': 'John Mayer',
            'url': 'https://music.apple.com/gb/album/im-gonna-find-another-you/184335550?i=184335953',
            'discNumber': 1,
            'genreNames': [
              'Singer/Songwriter',
              'Music',
              'Rock',
              'Adult Alternative',
              'Pop',
              'Pop/Rock',
              'Singer/Songwriter',
              'Blues-Rock',
              'Arena Rock'
            ],
            'durationInMillis': 162920,
            'releaseDate': '2006-09-12',
            'name': 'I\'m Gonna Find Another You',
            'isrc': 'USSM10603636',
            'hasLyrics': false,
            'albumName': 'Continuum',
            'playParams': {
              'id': '184335953',
              'kind': 'song'
            },
            'trackNumber': 12,
            'composerName': 'John Mayer'
          }
        }
      ],
      'href': '/v1/catalog/gb/albums/184335550/tracks'
    },
    'artists': {
      'data': [{
          'id': '472054',
          'type': 'artists',
          'href': '/v1/catalog/gb/artists/472054',
          'attributes': {
            'genreNames': [
              'Rock'
            ],
            'url': 'https://music.apple.com/gb/artist/john-mayer/472054',
            'name': 'John Mayer'
          },
          'relationships': {
            'albums': {
              'data': [{
                  'id': '1224352796',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1224352796'
                }, {
                  'id': '184335550',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/184335550'
                }, {
                  'id': '388127285',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/388127285'
                }, {
                  'id': '516701586',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/516701586'
                }, {
                  'id': '672720304',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/672720304'
                }, {
                  'id': '283699720',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/283699720'
                }, {
                  'id': '337970390',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/337970390'
                }, {
                  'id': '199049977',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/199049977'
                }, {
                  'id': '336390756',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/336390756'
                }, {
                  'id': '396148610',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/396148610'
                }, {
                  'id': '548458573',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/548458573'
                }, {
                  'id': '198617738',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/198617738'
                }, {
                  'id': '192974307',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/192974307'
                }, {
                  'id': '269966388',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/269966388'
                }, {
                  'id': '1444300495',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1444300495'
                }, {
                  'id': '214500265',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/214500265'
                }, {
                  'id': '322697981',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/322697981'
                }, {
                  'id': '157907156',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/157907156'
                }, {
                  'id': '157912917',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/157912917'
                }, {
                  'id': '157914424',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/157914424'
                }, {
                  'id': '1478826533',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1478826533'
                }, {
                  'id': '1451761131',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1451761131'
                }, {
                  'id': '1421952733',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1421952733'
                }, {
                  'id': '1380809549',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1380809549'
                }, {
                  'id': '881555962',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/881555962'
                }
              ],
              'href': '/v1/catalog/gb/artists/472054/albums',
              'next': '/v1/catalog/gb/artists/472054/albums?offset=42'
            }
          }
        }
      ],
      'href': '/v1/catalog/gb/albums/184335550/artists'
    }
  }
};
