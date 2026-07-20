import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  department: z.string().optional()
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
})

export const createTicketSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['HARDWARE', 'SOFTWARE', 'NETWORK', 'ACCESS', 'OTHER']),
  priority: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).optional()
})

export const updateStatusSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'ON_REVIEW', 'RESOLVED', 'CLOSED'])
})

export const assignTicketSchema = z.object({
  assignedToId: z.string().cuid('Invalid user ID')
})

export const commentSchema = z.object({
  text: z.string().min(1, 'Comment text is required'),
  isInternal: z.boolean().optional()
})
