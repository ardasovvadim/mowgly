export class Page<T> implements PageOptions {
  nextPageAvailable: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 0;
  count: number = 0;
  elements: T[] = []
}

export interface PageOptions {
  pageNumber: number;
  pageSize: number;
  count: number;
}
