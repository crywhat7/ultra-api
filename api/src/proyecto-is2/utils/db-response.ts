import { PostgrestError } from '@supabase/supabase-js';

export class DB_RESPONSE<T> {
  data: T;
  dataName: string;
  error: PostgrestError;
  errorDefault = 'Error desconocido';
  constructor(
    data: T,
    dataName: string,
    error: PostgrestError,
    errorDefault?: string,
  ) {
    this.data = data;
    this.error = error;
    this.dataName = dataName;
    if (errorDefault) this.errorDefault = errorDefault;
  }

  sendResponse() {
    if (this.error) {
      return this.sendErrorResponse();
    }
    return this.sendSuccessResponse();
  }

  sendSuccessResponse() {
    return {
      [this.dataName]: this.data,
    };
  }

  sendErrorResponse() {
    return {
      errorCode: this.error.code || 'UNKNOWN_ERROR_CODE',
      error: this.error.message || this.errorDefault,
    };
  }
}
