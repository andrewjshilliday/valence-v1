export interface Rating {
  href: string;
  id: string;
  type: string;
  attributes: Attributes;
}

export interface Attributes {
  value: number;
}

export interface Ratings {
  data?: (Rating)[] | null;
}

export interface RatingResponse {
  data: Rating[];
  href: string;
  next: string;
}
