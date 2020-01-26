import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaItemCollectionRowCarouselComponent } from './media-item-collection-row.component';

describe('MediaItemCollectionRowCarouselComponent', () => {
  let component: MediaItemCollectionRowCarouselComponent;
  let fixture: ComponentFixture<MediaItemCollectionRowCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemCollectionRowCarouselComponent ],
      providers: [ { provide: MatSnackBar, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemCollectionRowCarouselComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line: no-use-before-declare
    component.collection = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const data = [{
  'id': '204285054',
  'type': 'albums',
  'href': '/v1/catalog/gb/albums/204285054',
  'attributes': {
    'artwork': {
      'width': 1500,
      'height': 1500,
      'url': 'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/8b/f4/fc/8bf4fc12-df13-5769-1576-4540342f34ef/828768385227.jpg/{w}x{h}bb.jpeg',
      'bgColor': 'eadec6',
      'textColor1': '100809',
      'textColor2': '1b1915',
      'textColor3': '3c322e',
      'textColor4': '444038'
    },
    'artistName': 'Incubus',
    'isSingle': false,
    'url': 'https://music.apple.com/gb/album/light-grenades/204285054',
    'isComplete': true,
    'genreNames': [
      'Rock',
      'Music',
      'Hard Rock',
      'Adult Alternative',
      'Metal'
    ],
    'trackCount': 13,
    'isMasteredForItunes': false,
    'releaseDate': '2006-11-28',
    'name': 'Light Grenades',
    'recordLabel': 'Epic/Immortal',
    'copyright': '℗ 2006 Epic Records, a division of Sony Music Entertainment',
    'playParams': {
      'id': '204285054',
      'kind': 'album'
    },
    'editorialNotes': {
      'standard': 'As evidenced by “Quicksand,” the brief and atmospheric opening track, <i>Light Grenades</i> signals yet another new direction — or directions — for Incubus. Incorporating a variety of styles, the band shifts gears several times here, and they sound remarkably different from song to song. They can still rock as hard as ever (the title track, “Pendulous Threads”), but most of the tunes are catchy, radio-friendly fare (“Dig,” “Anna Molly,” “Diamonds and Coal,” “Paper Shoes”) and heavy ballads (“Love Hurts,” “Oil and Water”) that are less reliant on intensity and speed and more focused on dynamics and melody. Produced by Brendan O’Brien (Pearl Jam, Audioslave, Rage Against the Machine, many others) the overall sound is crisp and clean, and Brandon Boyd’s vocals are particularly good. <i>Light Grenades</i>, Incubus’ sixth album, is accessible enough to gain new listeners without disappointing their many existing fans, which is another way of saying that the band continues to evolve.'
    }
  },
  'relationships': {
    'artists': {
      'data': [{
          'id': '465707',
          'type': 'artists',
          'href': '/v1/catalog/gb/artists/465707',
          'attributes': {
            'name': 'Incubus',
            'genreNames': [
              'Rock'
            ],
            'url': 'https://music.apple.com/gb/artist/incubus/465707'
          },
          'relationships': {
            'albums': {
              'data': [{
                  'id': '271792608',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/271792608'
                }, {
                  'id': '1440881253',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1440881253'
                }, {
                  'id': '187454164',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/187454164'
                }, {
                  'id': '283662040',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/283662040'
                }, {
                  'id': '391706971',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/391706971'
                }, {
                  'id': '571750225',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/571750225'
                }, {
                  'id': '439057262',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/439057262'
                }, {
                  'id': '204285054',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/204285054'
                }, {
                  'id': '1445286217',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1445286217'
                }, {
                  'id': '315710875',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/315710875'
                }, {
                  'id': '546520769',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/546520769'
                }, {
                  'id': '264720007',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/264720007'
                }, {
                  'id': '203151485',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/203151485'
                }, {
                  'id': '477800094',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/477800094'
                }, {
                  'id': '546416705',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/546416705'
                }, {
                  'id': '456675135',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/456675135'
                }, {
                  'id': '456736703',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/456736703'
                }, {
                  'id': '456748210',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/456748210'
                }, {
                  'id': '209424466',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/209424466'
                }, {
                  'id': '163355854',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/163355854'
                }, {
                  'id': '400395014',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/400395014'
                }, {
                  'id': '1476608653',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1476608653'
                }, {
                  'id': '171353090',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/171353090'
                }
              ],
              'href': '/v1/catalog/gb/artists/465707/albums'
            }
          }
        }
      ],
      'href': '/v1/catalog/gb/albums/204285054/artists'
    }
  }
}, {
  'id': '538257183',
  'type': 'albums',
  'href': '/v1/catalog/gb/albums/538257183',
  'attributes': {
    'artwork': {
      'width': 1416,
      'height': 1416,
      'url': 'https://is4-ssl.mzstatic.com/image/thumb/Music128/v4/bf/65/a8/bf65a835-a6a7-5fc8-40c6-df80f4fe7aaa/828765555524.jpg/{w}x{h}bb.jpeg',
      'bgColor': 'ffffff',
      'textColor1': '000101',
      'textColor2': '540c14',
      'textColor3': '333434',
      'textColor4': '763d43'
    },
    'artistName': 'Foo Fighters',
    'isSingle': false,
    'url': 'https://music.apple.com/gb/album/one-by-one/538257183',
    'isComplete': true,
    'genreNames': [
      'Pop',
      'Music',
      'Alternative',
      'Rock',
      'Adult Alternative'
    ],
    'trackCount': 17,
    'isMasteredForItunes': false,
    'releaseDate': '2002-10-22',
    'name': 'One By One',
    'recordLabel': 'RCA Records Label',
    'copyright': '℗ 2003 Roswell Records, Inc.',
    'playParams': {
      'id': '538257183',
      'kind': 'album'
    }
  },
  'relationships': {
    'artists': {
      'data': [{
          'id': '6906197',
          'type': 'artists',
          'href': '/v1/catalog/gb/artists/6906197',
          'attributes': {
            'name': 'Foo Fighters',
            'genreNames': [
              'Rock'
            ],
            'url': 'https://music.apple.com/gb/artist/foo-fighters/6906197'
          },
          'relationships': {
            'albums': {
              'data': [{
                  'id': '334811953',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/334811953'
                }, {
                  'id': '1249068417',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1249068417'
                }, {
                  'id': '362133451',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/362133451'
                }, {
                  'id': '300855107',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/300855107'
                }, {
                  'id': '456563917',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/456563917'
                }, {
                  'id': '278229648',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/278229648'
                }, {
                  'id': '258512042',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/258512042'
                }, {
                  'id': '262743410',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/262743410'
                }, {
                  'id': '538257183',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/538257183'
                }, {
                  'id': '1059042560',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1059042560'
                }, {
                  'id': '910701272',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/910701272'
                }, {
                  'id': '1492184086',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1492184086'
                }, {
                  'id': '1472405885',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1472405885'
                }, {
                  'id': '203516964',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/203516964'
                }, {
                  'id': '1484521806',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1484521806'
                }, {
                  'id': '1037051429',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1037051429'
                }, {
                  'id': '1478044367',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1478044367'
                }, {
                  'id': '1482052247',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1482052247'
                }, {
                  'id': '1480567068',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1480567068'
                }, {
                  'id': '1489994374',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1489994374'
                }, {
                  'id': '1475862854',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1475862854'
                }, {
                  'id': '1488371573',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1488371573'
                }, {
                  'id': '1479870125',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1479870125'
                }, {
                  'id': '1470135049',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1470135049'
                }, {
                  'id': '1349353094',
                  'type': 'albums',
                  'href': '/v1/catalog/gb/albums/1349353094'
                }
              ],
              'href': '/v1/catalog/gb/artists/6906197/albums',
              'next': '/v1/catalog/gb/artists/6906197/albums?offset=50'
            }
          }
        }
      ],
      'href': '/v1/catalog/gb/albums/538257183/artists'
    }
  }
}, {
  'id': 'pl.25a03532ea324f26b7ab677c8fbb2473',
  'type': 'playlists',
  'href': '/v1/catalog/gb/playlists/pl.25a03532ea324f26b7ab677c8fbb2473',
  'attributes': {
    'artwork': {
      'width': 4320,
      'height': 1080,
      'url': 'https://is4-ssl.mzstatic.com/image/thumb/Features113/v4/fe/03/8c/fe038caa-d678-1e0c-3550-560a8cb99ffc/source/{w}x{h}cc.jpeg',
      'bgColor': 'e4e4e4',
      'textColor1': '0a0a0a',
      'textColor2': '1a1e20',
      'textColor3': '353535',
      'textColor4': '424547'
    },
    'isChart': false,
    'url': 'https://music.apple.com/gb/playlist/pixies-essentials/pl.25a03532ea324f26b7ab677c8fbb2473',
    'lastModifiedDate': '2019-09-04T15:56:04Z',
    'name': 'Pixies Essentials',
    'playlistType': 'editorial',
    'curatorName': 'Apple Music Alternative',
    'playParams': {
      'id': 'pl.25a03532ea324f26b7ab677c8fbb2473',
      'kind': 'playlist'
    },
    'description': {
      'standard': 'The Pixies\' gloriously stormy, dynamic noise-making put them at the forefront of American indie thanks to a simple chemistry: magnetic pop melodies usually filtered through sawtoothed, guitar-heavy attacks. The formula hits heavy on the whirlwind six-string crash of a joyous-sounding song like 1989\'s Salvador Dali-referencing “Debaser” or the driving flannel rock of “Letter to Memphis.” But they\'re just as ready to get sweet with the dense, bass-powered “Gigantic,” pinballing between Kim Deal\'s seductive verses and the clanging harmony of the choruses.',
      'short': 'Their gloriously dynamic noise made them indie icons.'
    }
  },
  'relationships': {
    'curator': {
      'data': [{
          'id': '988556214',
          'type': 'apple-curators',
          'href': '/v1/catalog/gb/apple-curators/988556214'
        }
      ],
      'href': '/v1/catalog/gb/playlists/pl.25a03532ea324f26b7ab677c8fbb2473/curator'
    }
  }
}];
