export class Page<T> {
  nextPageAvailable: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 0;
  count: number = 0;
  elements: T[] = []
}
