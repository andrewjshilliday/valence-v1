import { Injectable } from '@angular/core';
import { textChangeRangeIsUnchanged } from 'typescript';

declare var MusicKit: any;
import '../assets/musickit.js';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  musicKit: any;
  authorized: boolean = false;
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
  lastSearchQuery: string = '';
  playing: boolean = false;
  nowPlayingItem: any;
  albumDuration: number = 0;
  playlistDuration: number = 0;

  constructor() {
    MusicKit.configure({
      developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRUNUE1Q1JNTVQifQ.eyJpYXQiOjE1MzY3MzU4OTMsImV4cCI6MTU1MjI4Nzg5MywiaXNzIjoiQzQ3VVVKNFNRTiJ9.OEoZsMIPnAAlHMeNZ2aUF0877sdba70KNcHrcETIpoQv92wHjn77Z5TRCM4vtZPC2CVk8yv5QJiVaGM-IRH5cg',
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
  }

  async signin(): Promise<any> {
    await this.musicKit.authorize();
  }

  async signout(): Promise<any> {
    await this.musicKit.unauthorize();
  }

  async playItem(item, startIndex = 0): Promise<any> {
    const playParams = item.attributes.playParams;

    await this.musicKit.setQueue({
      [playParams.kind]: playParams.id
    });

    if (startIndex !== 0)
      await this.musicKit.changeToMediaAtIndex(startIndex);

    this.play();
  }

  queueNext (item) {
    this.musicKit.player.queue.prepend({ items: item });
  }

  queueLater (item) {
    this.musicKit.player.queue.append({ items: item });
  }

  async play(): Promise<any> {
    await this.musicKit.player.play();
  }

  async pause(): Promise<any> {
    await this.musicKit.player.pause();
    this.playing = false;
  }

  async playNext(): Promise<any> {
    await this.musicKit.player.skipToNextItem();
  }

  async playPrevious(): Promise<any> {
    await this.musicKit.player.skipToPreviousItem();
  }

  async search(query: string): Promise<any> {
    if (query === '' || query === this.lastSearchQuery)
      return;
    
    this.artists = null;
    this.albums = null;
    this.songs = null;
    this.playlists = null;

    let results = await this.musicKit.api.search(query, { types: 'artists,albums,songs,playlists', limit: 20 });

    if (results.artists != null)
      this.artists = results.artists.data;

    if (results.albums != null)
      this.albums = results.albums.data;

    if (results.songs != null)
      this.songs = results.songs.data;

    if (results.playlists != null)
      this.playlists = results.playlists.data;

    this.lastSearchQuery = query;
  }

  async getRecommenations(): Promise<any> {
    this.recommendations = await this.musicKit.api.recommendations();
    this.recentPlayed = await this.musicKit.api.recentPlayed();
    this.heavyRotation = await this.musicKit.api.historyHeavyRotation();
  }

  async getArtist(id): Promise<any> {
    if (this.artist && this.artist.id === id)
      return;

    this.artist = null;
    this.album = null;
    this.artist = await this.musicKit.api.artist(id, { include: 'albums' });
  }

  async getAlbum(id): Promise<any> {
    if (this.album && this.album.id === id)
      return;

    this.album = null;
    this.album = await this.musicKit.api.album(id, { include: 'songs' });
    
    for (let track of this.album.relationships.tracks.data) {
      this.albumDuration += track.attributes.durationInMillis;
    }
  }

  async getPlaylist(id): Promise<any> {
    if (this.playlist && this.playlist.id === id)
      return;

    this.playlist = null;
    this.playlist = await this.musicKit.api.playlist(id, { include: 'playlists' });

    for (let track of this.playlist.relationships.tracks.data) {
      this.playlistDuration += track.attributes.durationInMillis;
    }
  }

  async getPlaylists(id): Promise<any> {
    this.playlists = await this.musicKit.api.artist(id, { include: 'playlists' });
    var asd = 0;
  }

  formatArtworkURL(url: string, size: number): string {
    return MusicKit.formatArtworkURL(url, size, size);
  }

  isItemCurrentlyPlaying(id: number): boolean {
    if (this.musicKit.player.nowPlayingItem === null)
      return false;

    if (id === this.musicKit.player.nowPlayingItem.id && this.playing)
      return true;

    return false;
  }

  mediaItemDidChange(event) {
    this.nowPlayingItem = event.item;
  }

  playbackStateDidChange(event) {
    this.playing = event.state;
  }

  authorizationStatusDidChange(event) {
    this.authorized = event.authorizationStatus;
  }
}