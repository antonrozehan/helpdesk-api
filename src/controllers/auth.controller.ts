import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { registerSchema, loginSchema } from '../utils/validators'
import { AppError } from '../middleware/errorHandler'

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body)
    const result = await AuthService.register(data)
    res.status(201).json(result)
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0].message })
    }
    if (error instanceof AppError) {
      return res.status(error.status).json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body)
    const result = await AuthService.login(data)
    res.json(result)
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0].message })
    }
    if (error instanceof AppError) {
      return res.status(error.status).json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.getProfile(req.user!.id)
    res.json(user)
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
}
