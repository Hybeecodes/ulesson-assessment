export class PaginatedData<T> {
  data: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  constructor(
    data?: T[],
    page?: number,
    perPage?: number,
    total?: number,
    totalPages?: number,
  ) {
    if (data) this.data = data;
    if (page) this.page = page;
    if (perPage) this.perPage = perPage;
    if (total) this.total = total;
    if (totalPages) this.totalPages = totalPages;
  }
}
