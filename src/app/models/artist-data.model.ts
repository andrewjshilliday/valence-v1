export interface ArtistData {
  id: string;
  imageUrl: string;
  resources: Resources;
}

export interface Resources {
  data: Data;
  included?: Included[] | null;
}

export interface Data {
  attributes: Attributes;
  id: string;
  relationships: Relationships;
  type: string;
}

export interface Included {
  id: string;
  relationships: Relationships;
  type: string;
}

export interface Attributes {
  artistBio: string;
  bornOrFormedDate: string;
  isAppleMusicArtist: boolean;
  kind: string;
  name: string;
  origin: string;
  url: string;
}

export interface Relationships {
  artistContemporaries: RelationshipsData;
  content: RelationshipsData;
}

export interface RelationshipsData {
  data?: Data[] | null;
}

export interface Data {
  id: string;
  type: string;
}

export interface ArtistDataResponse {
  artists?: ArtistData[] | null;
}
