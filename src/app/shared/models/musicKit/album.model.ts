import { Artists } from './artist.model';
import { Artwork } from './common/artwork.model';
import { EditorialNotes } from './common/editorial-notes.model';
import { PlayParams } from './common/play-params.model';
import { Songs } from './song.model';

export interface Album {
  href: string;
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  artistName: string;
  contentRating: string;
  copyright: string;
  genreNames?: (string)[] | null;
  isComplete: boolean;
  isMasteredForItunes: boolean;
  isSingle: boolean;
  name: string;
  recordLabel: string;
  releaseDate: string;
  trackCount: number;
  url: string;
  artwork: Artwork;
  editorialNotes: EditorialNotes;
  playParams: PlayParams;
}

export interface Relationships {
  artists: Artists;
  tracks: Songs;
}

export interface Albums {
  data?: (Album)[] | null;
  href: string;
}

export interface AlbumResponse {
  data: Album[];
  href: string;
  next: string;
}
