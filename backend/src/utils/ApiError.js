// ==========================================
// Custom Error Classes
// Every thrown error carries a proper HTTP
// statusCode so the centralized error
// middleware can respond correctly.
// ==========================================

export class ApiError extends Error {
  constructor(message = "Something went wrong", statusCode = 500, errors = []) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad request", errors = []) {
    super(message, 400, errors);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Access denied") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export default ApiError;
