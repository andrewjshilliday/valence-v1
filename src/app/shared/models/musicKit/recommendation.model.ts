export interface Recommendation {
  href: string;
  id: string;
  next: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  isGroupRecommendation: boolean;
  nextUpdateDate: string;
  reason: string;
  resourceTypes?: (string)[] | null;
  title: TitleOrReason;
}

export interface Relationships {
  contents?: Contents | null;
  recommendations?: Recommendations | null;
}

export interface TitleOrReason {
  stringForDisplay: string;
}

export interface Contents {
  data?: (Recommendation)[] | null;
}

export interface Recommendations {
  data?: (Recommendation)[] | null;
}

export interface RecommendationResponse {
  data: Recommendation[];
  href: string;
  next: string;
}
