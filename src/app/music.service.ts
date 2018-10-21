import { Injectable } from '@angular/core';
import { Tokens } from './tokens';

declare var MusicKit: any;
import '../assets/musickit.js';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  musicKit: any;
  authorized = false;
  playing = false;
  nowPlayingItem: any;
  lastSearchQuery = '';
  playbackLoading: boolean;
  playbackError: boolean;

  artists: any;
  artist: any;
  albums: any;
  album: any;
  songs: any;
  playlists: any;
  playlist: any;
  recommendations: any;
  recentPlayed: any;
  heavyRotation: any;
  albumDuration: number;
  playlistDuration: number;
  queue: Array<any>;
  history: Array<any> = [];

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
    if (this.playbackLoading === true) {
      return;
    }

    await this.musicKit.player.skipToNextItem();
  }

  async playPrevious(): Promise<any> {
    if (this.playbackLoading === true) {
      return;
    }

    await this.musicKit.player.skipToPreviousItem();
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

  async search(query: string): Promise<any> {
    if (query === '' || query === this.lastSearchQuery) {
      return;
    }

    this.artists = null;
    this.albums = null;
    this.songs = null;
    this.playlists = null;

    const results = await this.musicKit.api.search(query, { types: 'artists,albums,songs,playlists', limit: 20 });

    if (results.artists != null) {
      this.artists = results.artists.data;
    }

    if (results.albums != null) {
      this.albums = results.albums.data;
    }

    if (results.songs != null) {
      this.songs = results.songs.data;
    }

    if (results.playlists != null) {
      this.playlists = results.playlists.data;
    }

    this.lastSearchQuery = query;
  }

  async getRecommenations(): Promise<any> {
    if (!this.recommendations) {
      this.recommendations = await this.musicKit.api.recommendations();
    }

    if (!this.recentPlayed) {
      this.recentPlayed = await this.musicKit.api.recentPlayed();
    }

    if (!this.heavyRotation) {
      this.heavyRotation = await this.musicKit.api.historyHeavyRotation();
    }
  }

  async getArtist(id): Promise<any> {
    if (this.artist && this.artist.id === id) {
      return;
    }

    this.artist = null;
    this.album = null;
    this.artist = await this.musicKit.api.artist(id, { include: 'albums' });
  }

  async getAlbum(id): Promise<any> {
    if (this.album && this.album.id === id) {
      return;
    }

    this.album = null;
    this.albumDuration = 0;
    this.album = await this.musicKit.api.album(id, { include: 'songs' });

    for (const track of this.album.relationships.tracks.data) {
      this.albumDuration += track.attributes.durationInMillis;
    }
  }

  async getPlaylist(id): Promise<any> {
    if (this.playlist && this.playlist.id === id) {
      return;
    }

    this.playlist = null;
    this.playlistDuration = 0;
    this.playlist = await this.musicKit.api.playlist(id, { include: 'playlists' });

    for (const track of this.playlist.relationships.tracks.data) {
      this.playlistDuration += track.attributes.durationInMillis;
    }
  }

  async getPlaylists(id): Promise<any> {
    this.playlists = await this.musicKit.api.artist(id, { include: 'playlists' });
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
          this.history.pop();
        }

        this.history.push(this.nowPlayingItem);
      }
    }

    this.nowPlayingItem = event.item;
  }

  playbackStateDidChange(event) {
    this.playing = event.state === 2;
    this.playbackLoading = event.state === 1 || event.state === 8;
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
