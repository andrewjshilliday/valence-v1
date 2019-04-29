import { Albums } from './album.model';
import { Playlists } from './playlist.model';
import { Songs } from './song.model';
import { Resource } from './common/resource.model';

export interface Chart {
  chart: string;
  href: string;
  name: string;
  next: string;
  data?: Resource[] | null;
}

export interface ChartResults {
  albums?: (Chart)[] | null;
  songs?: (Chart)[] | null;
  playlists?: (Chart)[] | null;
}

export interface ChartResponse {
  results: ChartResults;
  href: string;
  next: string;
}
