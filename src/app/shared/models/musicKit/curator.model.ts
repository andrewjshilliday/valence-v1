import { Artwork } from './common/artwork.model';
import { EditorialNotes } from './common/editorial-notes.model';
import { Playlists } from './playlist.model';

export interface Curator {
  href: string;
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  name: string;
  url: string;
  artwork: Artwork;
  editorialNotes: EditorialNotes;
}

export interface Relationships {
  playlists: Playlists;
}

export interface Curators {
  data?: (Curator)[] | null;
  href: string;
}

export interface CuratorResponse {
  data: Curator[];
  href: string;
  next: string;
}
