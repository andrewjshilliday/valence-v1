import { Injectable } from '@angular/core';
import { Tokens } from './tokens';

declare var MusicKit: any;
/* import '../assets/musickit.js'; */

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  musicKit: any;
  authorized = false;
  playing = false;
  nowPlayingItem: any;
  nowPlayingPlaylist: any;
  lastSearchTerm = '';
  playbackLoading: boolean;
  playbackLoadingTimeout: any;
  playbackError: boolean;

  artists: any;
  artist: any;
  albums: any;
  album: any;
  songs: any;
  playlists: any;
  playlist: any;
  queue: Array<any>;
  history: Array<any> = [];

  recommendations: any;
  recentPlayed: any;
  heavyRotation: any;

  top100: any;
  featuredPlaylists: any;
  aListPlaylists: any;
  appleCurators: any;
  curators: any;

  albumDuration: number;
  playlistDuration: number;
  recommendationsDate: number;

  constructor() {
    MusicKit.configure({
      developerToken: Tokens.appleMusicDevToken,
      app: {
        name: 'Apple Music Web Player',
        build: '0.1'
      }
    });

    this.musicKit = MusicKit.getInstance();
    this.authorized = this.musicKit.isAuthorized;
    this.musicKit.player.repeatMode = 2;

    this.musicKit.addEventListener(MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.playbackStateDidChange, this.playbackStateDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.authorizationStatusDidChange, this.authorizationStatusDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.queueItemsDidChange, this.queueItemsDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.queuePositionDidChange, this.queuePositionDidChange.bind(this));
    this.musicKit.addEventListener(MusicKit.Events.mediaPlaybackError, this.mediaPlaybackError.bind(this));
  }

  async playItem(item, startIndex: number = 0, shuffle: boolean = false): Promise<any> {
    if (this.playbackLoading === true) {
      return;
    }

    const playParams = item.attributes.playParams;
    this.musicKit.player.shuffleMode = 0;

    if (!this.playing && this.musicKit.player.nowPlayingItem && item.relationships.tracks.data[startIndex]) {
      if (item.relationships.tracks.data[startIndex].id === this.musicKit.player.nowPlayingItem.id) {
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

    if (shuffle === true) {
      this.musicKit.player.shuffleMode = 1;
    }

    if (item.type.includes('playlists')) {
      this.nowPlayingPlaylist = item;
    } else {
      this.nowPlayingPlaylist = null;
    }

    this.play();
  }

  queueNext (item) {
    this.musicKit.player.queue.prepend(item);
  }

  queueLater (item) {
    this.musicKit.player.queue.append(item);
  }

  async play(): Promise<any> {
    if (this.playbackLoading === true) {
      return;
    }

    await this.musicKit.player.play();
  }

  async pause(): Promise<any> {
    if (this.playbackLoading === true) {
      return;
    }

    await this.musicKit.player.pause();
  }

  async playNext(): Promise<any> {
    await this.musicKit.player.skipToNextItem();
  }

  async playPrevious(): Promise<any> {
    if (this.musicKit.player.currentPlaybackTime < 11) {
      await this.musicKit.player.skipToPreviousItem();
    } else {
      await this.musicKit.player.seekToTime(0);
    }
  }

  async stop(): Promise<any> {
    await this.musicKit.player.stop();
  }

  async signin(): Promise<any> {
    await this.musicKit.authorize();
  }

  async signout(): Promise<any> {
    await this.musicKit.unauthorize();
  }

  setVolume(volume: number) {
    this.musicKit.player.volume = volume;
  }

  async getArtist(id): Promise<any> {
    if (this.artist && this.artist.id === id) {
      return;
    }

    const isLibraryResource = id.startsWith('r.');
    this.artist = null;
    this.album = null;

    if (isLibraryResource) {
      this.artist = await this.musicKit.api.library.artist(id, { include: 'albums,playlists,tracks' });
    } else {
      this.artist = await this.musicKit.api.artist(id, { include: 'albums' });
    }
  }

  async getAlbum(id): Promise<any> {
    if (this.album && this.album.id === id) {
      return;
    }

    const isLibraryResource = id.startsWith('l.');
    this.album = null;
    this.albumDuration = 0;

    if (isLibraryResource) {
      this.album = await this.musicKit.api.library.album(id, { include: 'artists' });
    } else {
      this.album = await this.musicKit.api.album(id, { include: 'songs' });
    }

    for (const track of this.album.relationships.tracks.data) {
      this.albumDuration += track.attributes.durationInMillis;
    }
  }

  async getPlaylist(id): Promise<any> {
    if (this.playlist && this.playlist.id === id) {
      return;
    }

    const isLibraryResource = id.startsWith('p.');
    this.playlist = null;
    this.playlistDuration = 0;

    if (isLibraryResource) {
      this.playlist = await this.musicKit.api.library.playlist(id, { include: 'tracks' });
    } else {
      this.playlist = await this.musicKit.api.playlist(id, { include: 'curators' });
    }

    for (const track of this.playlist.relationships.tracks.data) {
      this.playlistDuration += track.attributes.durationInMillis;
    }
  }

  async getPlaylists(id): Promise<any> {
    this.playlists = await this.musicKit.api.artist(id, { include: 'playlists' });
  }

  async addToLibrary(item: any) {
    await this.musicKit.api.addToLibrary({ [item.type]: [item.id] });
    alert('Successfully added ' + item.attributes.name + ' to your library');
  }

  formatArtworkURL(url: string, size: number): string {
    return MusicKit.formatArtworkURL(url, size, size);
  }

  isItemCurrentlyPlaying(id: number): boolean {
    if (this.musicKit.player.nowPlayingItem === null) {
      return false;
    }

    if (id === this.musicKit.player.nowPlayingItem.id && this.playing) {
      return true;
    }

    return false;
  }

  isItemCurrentlyPaused(id: number): boolean {
    if (this.musicKit.player.nowPlayingItem === null) {
      return false;
    }

    if (id === this.musicKit.player.nowPlayingItem.id && !this.playing) {
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

  mediaItemDidChange(event) {
    if (this.nowPlayingItem) {
      if (!this.history.length || this.nowPlayingItem.id !== this.history[this.history.length - 1].songId) {
        if (this.history.length === 10) {
          this.history.shift();
        }

        this.history.push(this.nowPlayingItem);
      }
    }

    this.nowPlayingItem = event.item;
  }

  playbackStateDidChange(event) {
    this.playing = event.state === 2;
    this.playbackLoading = event.state === 1 || event.state === 8;

    window.clearTimeout(this.playbackLoadingTimeout);

    if (this.playbackLoading) {
      this.playbackLoadingTimeout = window.setTimeout(async function() {
        const musicKit = MusicKit.getInstance();
        await musicKit.player.stop();
        await musicKit.player.play();
      }, 5000);
    }
  }

  authorizationStatusDidChange(event) {
    this.authorized = event.authorizationStatus;
  }

  queueItemsDidChange(event) {
    if (this.musicKit.player.queue.position < 0) {
      return;
    }

    this.updateQueue();
  }

  queuePositionDidChange(event) {
    this.updateQueue();
  }

  mediaPlaybackError(event) {
    const error = event;
  }

}
