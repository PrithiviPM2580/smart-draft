export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: Array<{ field?: string; message: string }>;

  constructor(
    statusCode: number,
    message = 'Something went wrong',
    errors: Array<{ field?: string; message: string }> = [],
    stack?: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
