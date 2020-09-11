import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';

import { Artist, Album, Playlist, Curator, Recommendation, ChartResults, SearchResults, GeniusSong } from '../models';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicKit: any;
  authorized = false;
  playing = false;
  nowPlayingItem: any;
  nowPlayingPlaylist: any;
  playbackLoading: boolean;
  loadingTimeout: any;
  hasPlaybackTimedOut: boolean;
  playbackTimeout: any;

  nowPlayingItemGenius: GeniusSong;
  nowPlayingItemLyrics: string;

  artist: Artist;
  albums: Album[];
  album: Album;
  playlists: Playlist[];
  playlist: Playlist;
  queue: any[];
  history: any[] = [];

  searchResults: SearchResults;

  recommendations: Recommendation[];
  recentPlayed: Recommendation[];
  heavyRotation: Recommendation[];
  recommendationsDate: number;

  mostPlayed: ChartResults;
  top100: Playlist[];
  featuredPlaylists: Playlist[];
  aListPlaylists: Playlist[];
  appleCurators: Curator[];
  curators: Curator[];

  device: any;

  constructor(private notificationService: NotificationService) {
    MusicKit.configure({
      developerToken: environment.appleMusicDevToken,
      app: {
        name: 'Valence',
        build: '1.0'
      }
    });

    this.musicKit = MusicKit.getInstance();
    this.authorized = this.musicKit.isAuthorized;
    this.musicKit.player.repeatMode = 2;

    const bitrate = localStorage.getItem('bitrate');
    if (!bitrate) {
      this.setBitrate(256);
    } else {
      this.setBitrate(+bitrate);
    }

    const volume = localStorage.getItem('volume');
    if (!volume) {
      this.setVolume(1);
    } else {
      this.setVolume(+volume);
    }

    this.musicKit.addEventListener(MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.playbackStateDidChange, this.playbackStateDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.authorizationStatusDidChange, this.authorizationStatusDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.queueItemsDidChange, this.queueItemsDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.queuePositionDidChange, this.queuePositionDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.mediaPlaybackError, this.mediaPlaybackError.bind(this));

    this.initializeMediaDevices();
  }

  async playItem(item: any, startIndex: number = 0, shuffle: boolean = false) {
    try {
      const playParams = item.attributes.playParams;
      this.musicKit.player.shuffleMode = 0;

      if (!this.playing && this.nowPlayingItem && item.type !== 'songs') {
        if (item.relationships && item.relationships.tracks.data[startIndex] &&
          item.relationships.tracks.data[startIndex].id === this.nowPlayingItem.id) {
          this.play();
          return;
        }
      }

      await this.musicKit.setQueue({
        [playParams.kind]: playParams.id
      });

      if (startIndex !== 0) {
        await this.musicKit.changeToMediaAtIndex(startIndex);
      }

      if (shuffle) {
        this.musicKit.player.shuffleMode = 1;
      }

      if (item.type.includes('playlists')) {
        this.nowPlayingPlaylist = item;
      } else {
        this.nowPlayingPlaylist = null;
      }

      this.play();
    } catch (ex) {
      await this.stop();
      this.notificationService.open(`Error trying to play ${item.attributes.name}`);
    }
  }

  queueNext (item: any) {
    this.musicKit.player.queue.prepend(item);
    this.notificationService.open(`${item.attributes.name} by ${item.attributes.artistName} playing next`);
  }

  queueLater (item: any) {
    this.musicKit.player.queue.append(item);
    this.notificationService.open(`${item.attributes.name} by ${item.attributes.artistName} playing later`);
  }

  async play() {
    if (this.hasPlaybackTimedOut) {
      await this.musicKit.player.play();
      await this.musicKit.player.stop();
    }

    await this.musicKit.player.play();
  }

  async pause() {
    await this.musicKit.player.pause();
  }

  async playNext() {
    await this.musicKit.player.skipToNextItem();
  }

  async playPrevious() {
    if (this.musicKit.player.currentPlaybackTime < 11) {
      await this.musicKit.player.skipToPreviousItem();
    } else {
      await this.musicKit.player.seekToTime(0);
    }
  }

  async stop() {
    await this.musicKit.player.stop();
  }

  async seekToTime(time: number) {
    await this.musicKit.player.seekToTime(time);
  }

  toggleShuffle() {
    if (this.musicKit.player.shuffleMode === 0) {
      this.musicKit.player.shuffleMode = 1;
    } else {
      this.musicKit.player.shuffleMode = 0;
    }
  }

  toggleRepeat() {
    if (this.musicKit.player.repeatMode === 0) {
      this.musicKit.player.repeatMode = 2;
    } else if (this.musicKit.player.repeatMode === 2) {
      this.musicKit.player.repeatMode = 1;
    } else {
      this.musicKit.player.repeatMode = 0;
    }
  }

  async signin() {
    await this.musicKit.authorize();
  }

  async signout() {
    await this.musicKit.unauthorize();
  }

  setVolume(volume: number) {
    const audio: any = document.getElementById('apple-music-player');

    if (audio) {
      audio.volume = volume;
      localStorage.setItem('volume', volume.toString());
    }
  }

  setBitrate(bitrate: number) {
    this.musicKit.bitrate = bitrate;
    localStorage.setItem('bitrate', bitrate.toString());
  }

  formatArtwork(artwork: any, size: number): string {
    if (typeof artwork === 'string' || artwork instanceof String) {
      artwork = this.generateArtwork(String(artwork));
    }

    if (!artwork) {
      return;
    }

    return MusicKit.formatArtworkURL(artwork, size, size);
  }

  generateArtwork(url: string) {
    const artwork = {
      url: url,
      bgColor: '000000',
      height: 1000,
      width: 1000,
      textColor1: '000000',
      textColor2: '000000',
      textColor3: '000000',
      textColor4: '000000'
    };

    return artwork;
  }

  isItemCurrentlyPlaying(id: number): boolean {
    if (!this.nowPlayingItem) {
      return false;
    }

    if (id === this.nowPlayingItem.id && this.playing) {
      return true;
    }

    return false;
  }

  isItemCurrentlyPaused(id: number): boolean {
    if (!this.nowPlayingItem) {
      return false;
    }

    if (id === this.nowPlayingItem.id && !this.playing) {
      return true;
    }

    return false;
  }

  updateQueue() {
    this.queue = [];

    for (const item of this.musicKit.player.queue.items) {
      if (this.musicKit.player.queue.items.indexOf(item) > this.musicKit.player.queue.position) {
        this.queue.push(item);
      }
    }
  }

  mediaItemDidChange(event: any) {
    if (this.nowPlayingItem) {
      if (!this.history.length || this.nowPlayingItem.id !== this.history[this.history.length - 1].songId) {
        if (this.history.length === 30) {
          this.history.shift();
        }

        this.history.push(this.nowPlayingItem);
      }
    }

    this.nowPlayingItem = event.item;

    if (localStorage.getItem('enablePlayPause')) {
      this.hasPlaybackTimedOut = false;
      window.clearTimeout(this.playbackTimeout);

      this.playbackTimeout = window.setTimeout(() => {
        this.hasPlaybackTimedOut = true;
      }, 898000);
    }
  }

  playbackStateDidChange(event: any) {
    this.playing = event.state === 2;
    this.playbackLoading = event.state === 1 || event.state === 8;

    window.clearTimeout(this.loadingTimeout);

    if (this.playbackLoading && localStorage.getItem('enablePlaybackRecovery')) {
      const currentPlaybackTime = this.musicKit.player.currentPlaybackTime;

      this.loadingTimeout = window.setTimeout(async function() {
        const musicKit = MusicKit.getInstance();

        if (currentPlaybackTime <= 10) {
          await musicKit.player.stop();
          await musicKit.player.play();
        }
      }, (+localStorage.getItem('playbackTimeout') || 8000));
    }
  }

  authorizationStatusDidChange(event: any) {
    this.authorized = event.authorizationStatus;
  }

  queueItemsDidChange(event: any) {
    if (this.musicKit.player.queue.position < 0) {
      return;
    }

    this.updateQueue();
  }

  queuePositionDidChange(event: any) {
    this.updateQueue();
  }

  mediaPlaybackError(event: any) {
    if (event.errorCode === 'DEVICE_LIMIT' || event.errorCode === 'STREAM_UPSELL') {
      this.stop();
    }
  }

  initializeMediaDevices() {
    this.device = JSON.parse(localStorage.getItem('device'));

    if (!navigator.mediaDevices) {
      return;
    }

    navigator.mediaDevices.addEventListener('devicechange', () => {
      if (Boolean(JSON.parse(localStorage.getItem('enablePlayPause')))) {
        navigator.mediaDevices.enumerateDevices().then(audioDevices => {
          let foundDevice = false;

          if (this.device && this.device.id.length > 0) {
            for (const audioDevice of audioDevices) {
              if (audioDevice.deviceId === this.device.id) {
                foundDevice = true;

                if (this.nowPlayingItem && !this.playing) {
                  this.play();
                  return;
                }
              }
            }

            if (this.playing && !foundDevice) {
              this.pause();
            }
          }
        });
      }
    });
  }

}
