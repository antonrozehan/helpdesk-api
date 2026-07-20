import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/database'
import { RegisterRequest, LoginRequest } from '../types'
import { AppError } from '../middleware/errorHandler'

export class AuthService {
  static async register(data: RegisterRequest) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })
    
    if (existingUser) {
      throw new AppError('User already exists', 400)
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: 'EMPLOYEE'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        department: true,
        createdAt: true
      }
    })

    const token = this.generateToken(user.id, user.email)
    
    return { user, token }
  }

  static async login(data: LoginRequest) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })
    
    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const validPassword = await bcrypt.compare(data.password, user.password)
    if (!validPassword) {
      throw new AppError('Invalid credentials', 401)
    }

    const token = this.generateToken(user.id, user.email)

    const { password, ...userWithoutPassword } = user
    
    return { user: userWithoutPassword, token }
  }

  static generateToken(userId: string, email: string) {
    return jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        department: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  }
}
