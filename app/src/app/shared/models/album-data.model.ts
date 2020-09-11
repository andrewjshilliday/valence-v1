export interface AlbumDataResponse {
  albums?: AlbumData[] | null;
}

export interface AlbumData {
  id: string;
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
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  artistName: string;
  artistUrl: string;
  copyright: string;
  isMasteredForItunes: boolean;
  kind: string;
  name: string;
  popularity: number;
  releaseDate: string;
  trackCount: number;
  url: string;
}

export interface Relationships {
  artist: RelationshipData;
  listenersAlsoBought: RelationshipsData;
  songs: RelationshipsData;
  topAlbums: RelationshipsData;
}

export interface RelationshipsData {
  data?: Data[] | null;
}

export interface RelationshipData {
  data: Data;
}

export interface Data {
  type: string;
  id: string;
}

export interface AlbumDataResponse {
  albums?: AlbumData[] | null;
}

