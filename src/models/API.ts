export interface Query {
  from?: number;
  to?: number;
}
export interface Pagination {
  offset: number;
  limit: number;
  total: number;
  totalPage: number;
}
