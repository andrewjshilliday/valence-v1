export interface GeniusSong {
  album: GeniusAlbum;
  annotation_count: number;
  api_path: string;
  description_annotation: DescriptionAnnotation;
  embed_content: string;
  fact_track?: null;
  featured_artist?: null;
  features_video: boolean;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  lyrics: string;
  lyrics_owner_id: number;
  lyrics_state: string;
  media?: Media[] | null;
  path: string;
  primary_artist: GeniusArtist;
  producer_artists?: GeniusArtist[] | null;
  pyong_count: number;
  recording_location: string;
  release_date: string;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  song_relationships?: GeniusSongRelationships[] | null;
  stats: Stats;
  title: string;
  title_with_featured: string;
  url: string;
  writer_artists?: GeniusArtist[] | null;
}

export interface GeniusAlbum {
  api_path: string;
  cover_art_url: string;
  full_title: string;
  id: number;
  name: string;
  url: string;
  artist: GeniusArtist;
}

export interface DescriptionAnnotation {
  _type: string;
  annotator_id: number;
  annotator_login: string;
  api_path: string;
  classification: string;
  fragment: string;
  id: number;
  is_description: boolean;
  path: string;
  song_id: number;
  url: string;
  verified_annotator_ids?: (null)[] | null;
  annotatable: Annotatable;
  annotations?: Annotations[] | null;
  range: Range;
}

export interface Media {
  provider: string;
  provider_id: string;
  native_uri: string;
  start: number;
  type: string;
  url: string;
}

export interface GeniusArtist {
  alternate_names?: null;
  api_path: string;
  facebook_name: string;
  followers_count: number;
  header_image_url: string;
  id: number;
  image_url: string;
  instagram_name: string;
  is_meme_verified: boolean;
  is_verified: boolean;
  name: string;
  twitter_name: string;
  url: string;
  current_user_metadata?: null;
  iq: number;
  description_annotation?: null;
  user?: null;
}

export interface GeniusSongRelationships {
  type: string;
  songs?: (GeniusSong[] | null) | null;
}

export interface Stats {
  accepted_annotations: number;
  contributors: number;
  hot: boolean;
  iq_earners: number;
  transcribers: number;
  unreviewed_annotations: number;
  verified_annotations: number;
  concurrents: number;
  pageviews: number;
}

export interface Annotatable {
  api_path: string;
  context: string;
  id: number;
  image_url: string;
  link_title: string;
  title: string;
  type: string;
  url: string;
}

export interface Annotations {
  api_path: string;
  comment_count: number;
  community: boolean;
  custom_preview: string;
  has_voters: boolean;
  id: number;
  pinned: boolean;
  share_url: string;
  source: string;
  state: string;
  url: string;
  verified: boolean;
  voters_total: number;
  cosigned_by?: (null)[] | null;
  verified_by?: null;
}

export interface GeniusSongResponse {
  song: GeniusSong;
}
