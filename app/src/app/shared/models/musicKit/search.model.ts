import { ArtistResponse } from './artist.model';
import { AlbumResponse } from './album.model';
import { CuratorResponse } from './curator.model';
import { PlaylistResponse } from './playlist.model';
import { SongResponse } from './song.model';

export interface SearchResults {
  term: string;
  albums: AlbumResponse;
  appleCurators: CuratorResponse;
  artists: ArtistResponse;
  curators: CuratorResponse;
  playlists: PlaylistResponse;
  songs: SongResponse;
}

export interface SearchResponse {
  results: SearchResults;
}
