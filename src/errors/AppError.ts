import { DetailedError } from "types/error";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors?: DetailedError[];

  constructor(
    message: string,
    statusCode = 500,
    errors?: DetailedError[],
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Error de validación") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "No autorizado") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Acceso prohibido") {
    super(message, 403);
  }
}

export class TransactionError extends AppError {
  constructor(errors: DetailedError[], message = "Business logic error") {
    super(message, 400, errors);
  }
}
