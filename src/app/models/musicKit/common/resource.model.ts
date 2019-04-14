export interface Resource {
  attributes: Attributes;
  href: string;
  id: string;
  relationships: Relationships;
  type: string;
  meta: Meta;
}

// tslint:disable-next-line: no-empty-interface
export interface Attributes {}

// tslint:disable-next-line: no-empty-interface
export interface Relationships {}

// tslint:disable-next-line: no-empty-interface
export interface Meta {}

export interface ResourceResponse {
  data: Resource[];
  next: string;
}
