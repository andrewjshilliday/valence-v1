import { Albums } from './album.model';
import { Artists } from './artist.model';
import { Artwork } from './common/artwork.model';
import { EditorialNotes } from './common/editorial-notes.model';
import { PlayParams } from './common/play-params.model';

export interface Song {
  href: string;
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  albumName: string;
  artistName: string;
  composerName: string;
  contentRating: string;
  discNumber: number;
  durationInMillis: number;
  genreNames?: (string)[] | null;
  isrc: string;
  movementCount: number;
  movementName: string;
  movementNumber: number;
  name: string;
  releaseDate: string;
  trackNumber: number;
  url: string;
  workName: string;
  artwork: Artwork;
  editorialNotes: EditorialNotes;
  playParams: PlayParams;
  previews?: (Previews)[] | null;
}

export interface Relationships {
  artists: Artists;
  albums: Albums;
}

export interface Previews {
  url: string;
}

export interface Songs {
  data?: (Song)[] | null;
  href: string;
  next: string;
}

export interface SongResponse {
  data: Song[];
  href: string;
  next: string;
}
