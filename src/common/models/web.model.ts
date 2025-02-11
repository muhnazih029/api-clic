export class WebResponse<T> {
  message: string;
  errors?: boolean;
  data?: T;
  paging?: Paging;
}

export class Paging {
  perPage: number;
  total: number;
  current: number;
}
