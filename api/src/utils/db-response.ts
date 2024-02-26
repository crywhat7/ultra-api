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

  sendResponse(): API_RESPONSE<T> {
    if (this.error) {
      return this.sendErrorResponse();
    }
    return this.sendSuccessResponse();
  }

  sendSuccessResponse() {
    const count = Array.isArray(this.data) ? this.data.length : 1;

    return {
      isSuccess: true,
      message: `Se obtuvieron los ${this.dataName} correctamente`,
      count,
      data: this.data,
    };
  }

  sendErrorResponse() {
    return {
      isSuccess: false,
      message: this.error.message || this.errorDefault,
      count: 0,
      data: null,
      errorCode: this.error.code || 'UNKNOWN_ERROR_CODE',
    };
  }
}

export interface API_RESPONSE<T> {
  isSuccess: boolean;
  message: string;
  count: number;
  data: T | null;
  errorCode?: string;
}
