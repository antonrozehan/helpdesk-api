import { Request, Response, NextFunction } from 'express'

export class AppError extends Error {
  status: number
  
  constructor(message: string, status: number = 500) {
    super(message)
    this.status = status
    this.name = 'AppError'
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err)

  const status = err.status || 500
  const message = err.message || 'Internal server error'

  res.status(status).json({
    error: message,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  })
}
