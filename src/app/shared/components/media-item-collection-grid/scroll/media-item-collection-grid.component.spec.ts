import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MediaItemCollectionGridComponent } from './media-item-collection-grid.component';

describe('MediaItemCollectionGridComponent', () => {
  let component: MediaItemCollectionGridComponent;
  let fixture: ComponentFixture<MediaItemCollectionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, PerfectScrollbarModule ],
      declarations: [ MediaItemCollectionGridComponent ],
      providers: [ { provide: MatSnackBar, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemCollectionGridComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line: no-use-before-declare
    component.collection = data;
    component.numRows = 3;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const data = [{
  'id': '388127336',
  'type': 'songs',
  'href': '/v1/catalog/gb/songs/388127336',
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
    'url': 'https://music.apple.com/gb/album/free-fallin-live/388127285?i=388127336',
    'discNumber': 1,
    'genreNames': [
      'Pop',
      'Music',
      'Rock',
      'Adult Alternative',
      'Pop/Rock',
      'Blues-Rock'
    ],
    'durationInMillis': 263573,
    'releaseDate': '2008-07-01',
    'name': 'Free Fallin\' (Live)',
    'isrc': 'USSM10801204',
    'hasLyrics': true,
    'albumName': 'Where the Light Is: John Mayer Live in Los Angeles',
    'playParams': {
      'id': '388127336',
      'kind': 'song'
    },
    'trackNumber': 5,
    'composerName': 'Thomas Earl Petty & Jeffrey Lynne'
  },
  'relationships': {
    'artists': {
      'data': [{
          'id': '472054',
          'type': 'artists',
          'href': '/v1/catalog/gb/artists/472054'
        }
      ],
      'href': '/v1/catalog/gb/songs/388127336/artists'
    },
    'albums': {
      'data': [{
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
          }
        }
      ],
      'href': '/v1/catalog/gb/songs/388127336/albums'
    }
  }
}, {
  'id': '1455151656',
  'type': 'songs',
  'href': '/v1/catalog/gb/songs/1455151656',
  'attributes': {
    'previews': [{
        'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/ae/bd/d9/aebdd9b5-8f4d-ca7d-da03-0d2a7004de3e/mzaf_465959030921016751.plus.aac.p.m4a'
      }
    ],
    'artwork': {
      'width': 3000,
      'height': 3000,
      'url': 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/36/94/0e/36940e23-2d97-a7e3-f6e6-a2d365346f6a/886447501610.jpg/{w}x{h}bb.jpeg',
      'bgColor': '61a6db',
      'textColor1': '060608',
      'textColor2': '251809',
      'textColor3': '182632',
      'textColor4': '313433'
    },
    'artistName': 'Khalid',
    'url': 'https://music.apple.com/gb/album/outta-my-head-with-john-mayer/1455151397?i=1455151656',
    'discNumber': 1,
    'genreNames': [
      'R&B/Soul',
      'Music'
    ],
    'durationInMillis': 177107,
    'releaseDate': '2019-04-05',
    'name': 'Outta My Head (with John Mayer)',
    'isrc': 'USRC11900439',
    'hasLyrics': true,
    'albumName': 'Free Spirit',
    'playParams': {
      'id': '1455151656',
      'kind': 'song'
    },
    'trackNumber': 10,
    'composerName': 'John Mayer, Khalid Robinson, John Hill, Sarah Aarons & Jamil Chammas'
  },
  'relationships': {
    'artists': {
      'data': [{
          'id': '82842423',
          'type': 'artists',
          'href': '/v1/catalog/gb/artists/82842423'
        }
      ],
      'href': '/v1/catalog/gb/songs/1455151656/artists'
    },
    'albums': {
      'data': [{
          'id': '1455151397',
          'type': 'albums',
          'href': '/v1/catalog/gb/albums/1455151397',
          'attributes': {
            'artwork': {
              'width': 3000,
              'height': 3000,
              'url': 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/36/94/0e/36940e23-2d97-a7e3-f6e6-a2d365346f6a/886447501610.jpg/{w}x{h}bb.jpeg',
              'bgColor': '61a6db',
              'textColor1': '060608',
              'textColor2': '251809',
              'textColor3': '182632',
              'textColor4': '313433'
            },
            'artistName': 'Khalid',
            'isSingle': false,
            'url': 'https://music.apple.com/gb/album/free-spirit/1455151397',
            'isComplete': true,
            'genreNames': [
              'R&B/Soul',
              'Music',
              'Contemporary R&B'
            ],
            'trackCount': 17,
            'isMasteredForItunes': true,
            'releaseDate': '2019-04-05',
            'name': 'Free Spirit',
            'recordLabel': 'Right Hand Music Group, LLC/RCA Records',
            'copyright': '℗ 2019 RCA Records, a division of Sony Music Entertainment',
            'playParams': {
              'id': '1455151397',
              'kind': 'album'
            },
            'editorialNotes': {
              'standard': '“I wrote <i>American Teen</i> at 17 years old,” Khalid told Beats 1 host Zane Lowe. “Now I get to release this at 20-21, so it\'s a completely different mind frame.” His much-anticipated second album, the 17-track <i>Free Spirit</i>—and its companion film of the same name, created by Khalid along with director Emil Nava—is a soulful, sober meditation on what he\'s learned in those intervening years and about what happens when you long for personal freedom but aren\'t yet totally sure what to do with it. Khalid talked through the stories and inspiration behind each song with Zane, so read along as you take it all in.<br />\n<b>“Intro”</b>\n“I wanted people to find their own name for this song and what it means to them. It was made to be the intro: I\'m naming it \'Intro.\' No other name popped up in my head. It\'s so cinematic and it washes over you, and I\'m like, \'People have to hear this first.\'”<br />\n<b>“Bad Luck”</b>\n“<i>American Teen</i> started a little bit more up, a little bit more happy. For <i>Free Spirit</i>, overall, the vibe\'s completely different—the melancholy tone, the melodies. \'Bad Luck\' was so fitting to the intro it had to go right after. That intensity—it\'s literally like it\'s punching you in the face.”<br />\n<b>“My Bad”</b>\n“It\'s so crazy because that song floated out of me. I wrote that in less than 10 minutes flat. So I was obviously in my bag for real.”<br />\n<b>“Better”</b>\n“I was in LA, I was at the studio. I was surrounded by my friends. Good energy. I was just in the pocket. I think I was fresh off of tour and I was like, I gotta create, I gotta. I held all of that energy that I had on tour and it was just like, boom boom boom boom. All the songs just flew out of me, and \'Better\' was definitely one.”<br />\n<b>“Talk”</b>\n“I love Disclosure so much, and they were on my wish list of people I wanted to collaborate with since I started music. It\'s like a gift to myself. It was a little naive of me to go into the session expecting to walk out with a house record. This beat was my second pick—until I sang on it and was like, \'Oh OK, this makes so much sense.\' This song is so huge, it\'s just one of my favorite songs I\'ve ever done. And there is definitely another Disclosure song floating out there somewhere in the world.”<br />\n<b>“Right Back”</b>\n“I love working with [producers] Stargate because every time I work with them, the melodies just flow right out of me. It gives me this level of nostalgia from one of my favorite areas of music, the \'90s. The way that it sounds, the way that I see my friends dance to it, and the fact that my mom really, really loves it—that was the tipping point. If my mom doesn\'t like a song, it\'s not making the album.”<br />\n<b>“Don\'t Pretend” (feat. SAFE)</b>\n“I think I did this song with SAFE in like 2016, 2017. I love his tone, I love his melody. And this was actually one of the last songs I recorded for the album. It got brought back to my attention and I was like, \'I love this song so much, it has to find a way out.\'”<br />\n<b>“Paradise”</b>\n“I feel like having enough songs for people to see different sides of me as an artist. I could\'ve gone forever—there were like 30 more songs. Although there were some that didn\'t make the album, that doesn\'t mean those won\'t have a life. I could hit up some of my favorite artists and be like, \'Yo, do you want to turn this into a collab and you want to hop on it?\'”<br />\n<b>“Hundred”</b>\n“\'Hundred\' is the soundtrack of my life. When I\'m in the mix of everything, I\'m on autopilot and I can\'t stop. I swear I could get into car crash after car crash, I\'m making my way through wherever I got to go and I\'m getting the job done. I hate canceling anything. I performed shows sick. If I gotta walk onstage with a broken foot, I\'m going to do it. Keep it a hundred. I got a hundred things I got to do.”<br />\n<b>“Outta My Head”</b>\n“I think \'Outta My Head\' is definitely my favorite because of just how timing came into play. It was ridiculous—I\'m walking out of the studio and I run into John Mayer. And then I\'m like, \'Yo, you want to hear my project?\' Third song in and then he hopped on it and it was great. It\'s such a moment.”<br />\n<b>“Free Spirit”</b>\n“This is the pivotal point, sonically, of the album. It starts off a little dark and gets a little bit more lighthearted. I feel like \'Free Spirit\' is the start of where everything gets intense and more cinematic.”<br />\n<b>“Twenty One”</b>\n“I love that my friends and I have such a complete understanding of each other emotionally. I get to talk to them and I get to make time for them, they get to make time for me. Just to hang out and just to live and tell stories. You can\'t write a song if you don\'t have anything to write about. My friends give me something to write about every single day.”<br />\n<b>“Bluffin\'”</b>\n“This is so heavy and soulful. It\'s almost like that make-up-after-breakup song. If you\'ve gotten into an argument with your bae or whatever you got going on, you play that song. It sets the tone completely. If it didn\'t make the album, if they made another <i>Fifty Shades</i>, maybe that song would fit there.”<br />\n<b>“Self”</b>\n“I had to get ready to be comfortable with allowing myself to literally talk about loss, and talk about losing, and talk about how even though I\'m at this high to the world, mentally I feel like I\'m at a low at that moment when I wrote that song. I wanted to leave my fans with something where they felt connected to me on a different level and they realized, \'Wow, he\'s just like me and he goes through what I go through, and he has his time where he stares in front of a mirror and picks himself apart and then builds himself back together.\'”<br />\n<b>“Alive”</b>\n“This is the second chapter of everything—chapter two, act two. I felt like ending it giving people a song they can listen to whenever they\'re feeling down, whenever they\'re going through something. Though these songs feel very sad, I feel like they have a brighter message.”<br />\n<b>“Heaven”</b>\n“Father John Misty wrote \'Heaven.\' That\'s a song he loved a lot and he felt like it was so fitting for me. I feel like my voice is not too far off from his because that\'s a voice I grew up with, and sat with, and lived with. How many people do you know out there who can say they sang a song Father John Misty wrote? The fact that he looks to me like, \'You\'re going to do this song justice, and you\'re going to sing this song the way that it should be sung.\' Amazing.”<br />\n<b>“Saturday Nights”</b>\n“I don\'t think I really wanted to end the album on such a dark and tense note. It\'s one of my favorite songs I\'ve ever written. The fact that it gets a new life because there\'s going to be a lot of people who listen to <i>Free Spirit</i> that didn\'t listen to [2018 EP] <i>Suncity</i>, and the fact that it plays a big part of the film as well—it was perfect. It had to go last.”',
              'short': 'An American teen grows up, gets wiser on album #2.'
            }
          }
        }
      ],
      'href': '/v1/catalog/gb/songs/1455151656/albums'
    }
  }
}, {
  'id': '283699774',
  'type': 'songs',
  'href': '/v1/catalog/gb/songs/283699774',
  'attributes': {
    'previews': [{
        'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/Music/4b/39/30/mzm.aafzxpkn.aac.p.m4a'
      }
    ],
    'artwork': {
      'width': 600,
      'height': 600,
      'url': 'https://is5-ssl.mzstatic.com/image/thumb/Music/bc/03/9a/mzi.tciowflu.jpg/{w}x{h}bb.jpeg',
      'bgColor': 'ffffff',
      'textColor1': '0b0c0b',
      'textColor2': '402b20',
      'textColor3': '3c3c3c',
      'textColor4': '66554d'
    },
    'artistName': 'John Mayer',
    'url': 'https://music.apple.com/gb/album/your-body-is-a-wonderland/283699720?i=283699774',
    'discNumber': 1,
    'genreNames': [
      'Rock',
      'Music',
      'Singer/Songwriter',
      'Adult Alternative'
    ],
    'durationInMillis': 249627,
    'releaseDate': '2001-06-05',
    'name': 'Your Body Is a Wonderland',
    'isrc': 'USSM10102943',
    'hasLyrics': false,
    'albumName': 'Room for Squares',
    'playParams': {
      'id': '283699774',
      'kind': 'song'
    },
    'trackNumber': 4,
    'composerName': 'John Mayer'
  },
  'relationships': {
    'artists': {
      'data': [{
          'id': '472054',
          'type': 'artists',
          'href': '/v1/catalog/gb/artists/472054'
        }
      ],
      'href': '/v1/catalog/gb/songs/283699774/artists'
    },
    'albums': {
      'data': [{
          'id': '283699720',
          'type': 'albums',
          'href': '/v1/catalog/gb/albums/283699720',
          'attributes': {
            'artwork': {
              'width': 600,
              'height': 600,
              'url': 'https://is5-ssl.mzstatic.com/image/thumb/Music/bc/03/9a/mzi.tciowflu.jpg/{w}x{h}bb.jpeg',
              'bgColor': 'ffffff',
              'textColor1': '0b0c0b',
              'textColor2': '402b20',
              'textColor3': '3c3c3c',
              'textColor4': '66554d'
            },
            'artistName': 'John Mayer',
            'isSingle': false,
            'url': 'https://music.apple.com/gb/album/room-for-squares/283699720',
            'isComplete': true,
            'genreNames': [
              'Rock',
              'Music',
              'Singer/Songwriter',
              'Adult Alternative'
            ],
            'trackCount': 13,
            'isMasteredForItunes': false,
            'releaseDate': '2001-06-05',
            'name': 'Room for Squares',
            'recordLabel': 'Aware/Columbia',
            'copyright': '℗ 2001 Sony Music Entertainment Inc.',
            'playParams': {
              'id': '283699720',
              'kind': 'album'
            }
          }
        }
      ],
      'href': '/v1/catalog/gb/songs/283699774/albums'
    }
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
  },
  'relationships': {
    'artists': {
      'data': [{
          'id': '472054',
          'type': 'artists',
          'href': '/v1/catalog/gb/artists/472054'
        }
      ],
      'href': '/v1/catalog/gb/songs/184335660/artists'
    },
    'albums': {
      'data': [{
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
          }
        }
      ],
      'href': '/v1/catalog/gb/songs/184335660/albums'
    }
  }
}, {
  'id': '1380809736',
  'type': 'songs',
  'href': '/v1/catalog/gb/songs/1380809736',
  'attributes': {
    'previews': [{
        'url': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/bc/10/1a/bc101a99-addb-a4e4-70ed-91d29f11c460/mzaf_17061352332691448568.plus.aac.p.m4a'
      }
    ],
    'artwork': {
      'width': 1500,
      'height': 1500,
      'url': 'https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/d2/f5/37/d2f53726-6d65-66a7-e099-b08263750337/192562519394.jpg/{w}x{h}bb.jpeg',
      'bgColor': '181d19',
      'textColor1': 'fcfadf',
      'textColor2': 'fffe00',
      'textColor3': 'ceceb8',
      'textColor4': 'd0d005'
    },
    'artistName': 'John Mayer',
    'url': 'https://music.apple.com/gb/album/new-light/1380809549?i=1380809736',
    'discNumber': 1,
    'genreNames': [
      'Pop',
      'Music'
    ],
    'durationInMillis': 216015,
    'releaseDate': '2018-05-10',
    'name': 'New Light',
    'isrc': 'QM4TW1898425',
    'hasLyrics': true,
    'albumName': 'New Light - Single',
    'playParams': {
      'id': '1380809736',
      'kind': 'song'
    },
    'trackNumber': 1,
    'composerName': 'John Mayer & No ID'
  },
  'relationships': {
    'artists': {
      'data': [{
          'id': '472054',
          'type': 'artists',
          'href': '/v1/catalog/gb/artists/472054'
        }
      ],
      'href': '/v1/catalog/gb/songs/1380809736/artists'
    },
    'albums': {
      'data': [{
          'id': '1380809549',
          'type': 'albums',
          'href': '/v1/catalog/gb/albums/1380809549',
          'attributes': {
            'artwork': {
              'width': 1500,
              'height': 1500,
              'url': 'https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/d2/f5/37/d2f53726-6d65-66a7-e099-b08263750337/192562519394.jpg/{w}x{h}bb.jpeg',
              'bgColor': '181d19',
              'textColor1': 'fcfadf',
              'textColor2': 'fffe00',
              'textColor3': 'ceceb8',
              'textColor4': 'd0d005'
            },
            'artistName': 'John Mayer',
            'isSingle': true,
            'url': 'https://music.apple.com/gb/album/new-light-single/1380809549',
            'isComplete': true,
            'genreNames': [
              'Pop',
              'Music'
            ],
            'trackCount': 1,
            'isMasteredForItunes': false,
            'releaseDate': '2018-05-10',
            'name': 'New Light - Single',
            'recordLabel': 'Snack Money',
            'copyright': '℗ 2018 Snack Money',
            'playParams': {
              'id': '1380809549',
              'kind': 'album'
            },
            'editorialNotes': {
              'short': 'Moonlit melodies, soft-swaying grooves, and studio magic from No I.D.'
            }
          }
        }
      ],
      'href': '/v1/catalog/gb/songs/1380809736/albums'
    }
  }
}];
