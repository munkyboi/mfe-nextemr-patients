export interface IResponse<T> {
  status: 'SUCCESS' | 'FAILED';
  data: T;
}
