export interface DetailedError {
  errorKey: string;
  errorParameters?: string | Record<string, unknown>;
  errorMessage: string;
  errorCode?: string;
}
