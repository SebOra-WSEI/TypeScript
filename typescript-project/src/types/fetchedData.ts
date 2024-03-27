export interface FetchedData<T> {
  data: T;
  loading: boolean;
  error: string;
  message?: string;
}
