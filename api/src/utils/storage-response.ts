export class STORAGE_RESPONSE<T> {
  data: T;
  dataName: string;
  error: any;
  errorDefault = 'Error desconocido';
  constructor(data: T, dataName: string, error: any, errorDefault?: string) {
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
    const count = Array.isArray(this.data) ? this.data.length : 1;

    return {
      isSuccess: true,
      message: `Se subió la ${this.dataName} correctamente`,
      count,
      data: this.data as T,
    };
  }

  sendErrorResponse() {
    return {
      isSuccess: false,
      message: this.error?.message ?? this.errorDefault,
      count: 0,
      data: null,
      errorCode: this.error?.error ?? 'UNKNOWN_ERROR_CODE',
    };
  }
}
