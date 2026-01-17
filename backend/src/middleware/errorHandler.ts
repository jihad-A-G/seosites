import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: boolean;
  message: string;
  stack?: string;
}

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log to console for dev
  console.error(err);
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(', ');
    error = { message, statusCode: 400 };
  }
  
  const response: ErrorResponse = {
    success: false,
    message: error.message || 'Server Error',
  };
  
  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }
  
  res.status(error.statusCode || 500).json(response);
};

export default errorHandler;
