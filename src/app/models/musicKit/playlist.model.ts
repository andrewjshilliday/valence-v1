import { Artwork } from './common/artwork.model';
import { EditorialNotes } from './common/editorial-notes.model';
import { PlayParams } from './common/play-params.model';
import { Songs } from './song.model';

export interface Playlist {
  href: string;
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  curatorName: string;
  lastModifiedDate: string;
  name: string;
  playlistType: string;
  url: string;
  artwork: Artwork;
  description: EditorialNotes;
  playParams: PlayParams;
}

export interface Relationships {
  tracks: Songs;
}

export interface Playlists {
  data?: (Playlist)[] | null;
  href: string;
  next: string;
}

export interface PlaylistResponse {
  data: Playlist[];
  href: string;
  next: string;
}
