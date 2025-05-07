import { AppError } from "@errors/AppError";
import { logger } from "config/logger";
import { Request, Response, NextFunction } from "express";
import type { ErrorRequestHandler } from "express";
import { DetailedError } from "types/error";

// export const errorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.error(err); // Puedes mejorar esto con un logger
//   res.status(err.status || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// };
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err); // call logger
  logger.error(err.message);
  if (err instanceof AppError) {
    const response: {
      status: string;
      message: string;
      errors?: DetailedError[];
    } = {
      status: "error",
      message: err.message,
    };

    if (err.errors) {
      response.errors = err.errors;
    }

    return void res.status(err.statusCode).json(response);
  }

  // Para errores inesperados
  return void res.status(500).json({
    status: "error",
    message: err.message ?? "Algo salió mal en el servidor.",
  });
};
