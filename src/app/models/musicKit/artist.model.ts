import { Artwork } from './common/artwork.model';
import { Albums } from './album.model';
import { EditorialNotes } from './common/editorial-notes.model';
import { Playlists } from './playlist.model';

export interface Artist {
  href: string;
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  genreNames?: (string)[] | null;
  name: string;
  url: string;
  artwork: Artwork;
  editorialNotes: EditorialNotes;
}

export interface Relationships {
  albums: Albums;
  playlists: Playlists;
}

export interface Artists {
  data?: (Artist)[] | null;
  href: string;
}

export interface ArtistResponse {
  data: Artist[];
  href: string;
  next: string;
}
