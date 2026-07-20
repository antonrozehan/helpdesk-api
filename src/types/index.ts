import { User } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  department?: string
}

export interface CreateTicketRequest {
  title: string
  description: string
  category: 'HARDWARE' | 'SOFTWARE' | 'NETWORK' | 'ACCESS' | 'OTHER'
  priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface UpdateStatusRequest {
  status: 'NEW' | 'IN_PROGRESS' | 'ON_REVIEW' | 'RESOLVED' | 'CLOSED'
}

export interface AssignTicketRequest {
  assignedToId: string
}
