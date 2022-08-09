export interface Pagination {
  offset: number;
  max: number;
  sort?: string[];
}

export interface Search {
  query: string;
}

export interface SearchWithPagination extends Search, Pagination {}
