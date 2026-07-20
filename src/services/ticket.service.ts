import prisma from '../config/database'
import { Status } from '@prisma/client'
import { AppError } from '../middleware/errorHandler'
import { CreateTicketRequest, UpdateStatusRequest, AssignTicketRequest } from '../types'

export class TicketService {
  private static getSLAHours(priority: string): number {
    const map: Record<string, number> = {
      'CRITICAL': 1,
      'HIGH': 4,
      'MEDIUM': 24,
      'LOW': 72
    }
    return map[priority] || 24
  }

  static async createTicket(data: CreateTicketRequest, userId: string) {
    const slaHours = this.getSLAHours(data.priority || 'MEDIUM')
    const slaDeadline = new Date(Date.now() + slaHours * 60 * 60 * 1000)

    const ticket = await prisma.ticket.create({
      data: {
        ...data,
        priority: data.priority || 'MEDIUM',
        createdById: userId,
        slaDeadline,
        status: 'NEW'
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        },
        assignedTo: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    await prisma.ticketHistory.create({
      data: {
        ticketId: ticket.id,
        changedBy: userId,
        field: 'status',
        oldValue: 'NEW',
        newValue: 'NEW'
      }
    })

    return ticket
  }

  static async assignTicket(ticketId: string, data: AssignTicketRequest, userId: string) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    })

    if (!ticket) {
      throw new AppError('Ticket not found', 404)
    }

    const assignedUser = await prisma.user.findUnique({
      where: { id: data.assignedToId }
    })

    if (!assignedUser) {
      throw new AppError('User not found', 404)
    }

    if (assignedUser.role === 'EMPLOYEE') {
      throw new AppError('Cannot assign ticket to employee', 400)
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        assignedToId: data.assignedToId,
        status: 'IN_PROGRESS'
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        },
        assignedTo: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    await prisma.ticketHistory.create({
      data: {
        ticketId: ticket.id,
        changedBy: userId,
        field: 'assignedTo',
        oldValue: ticket.assignedToId || 'unassigned',
        newValue: data.assignedToId
      }
    })

    return updated
  }

  static async updateStatus(ticketId: string, data: UpdateStatusRequest, userId: string) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    })

    if (!ticket) {
      throw new AppError('Ticket not found', 404)
    }

    const updateData: any = { status: data.status }
    
    if (data.status === 'RESOLVED' || data.status === 'CLOSED') {
      updateData.resolvedAt = new Date()
      if (data.status === 'RESOLVED') {
        const timeToResolve = Math.floor(
          (Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60)
        )
        updateData.timeToResolve = timeToResolve
      }
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: updateData,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        },
        assignedTo: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    await prisma.ticketHistory.create({
      data: {
        ticketId: ticket.id,
        changedBy: userId,
        field: 'status',
        oldValue: ticket.status,
        newValue: data.status
      }
    })

    return updated
  }

  static async getTickets(filters: any, userId: string, userRole: string) {
    const where: any = {}

    if (filters.status) where.status = filters.status
    if (filters.priority) where.priority = filters.priority
    if (filters.category) where.category = filters.category

    if (userRole === 'EMPLOYEE') {
      where.createdById = userId
    } else if (userRole === 'IT_SPECIALIST') {
      where.OR = [
        { assignedToId: userId },
        { status: 'NEW' }
      ]
    }

    const tickets = await prisma.ticket.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        },
        assignedTo: {
          select: { id: true, name: true, email: true }
        },
        _count: {
          select: { comments: true }
        }
      }
    })

    return tickets
  }

  static async getTicketById(ticketId: string, userId: string, userRole: string) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        },
        assignedTo: {
          select: { id: true, name: true, email: true }
        },
        comments: {
          include: {
            author: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        history: {
          orderBy: { changedAt: 'desc' },
          take: 10
        }
      }
    })

    if (!ticket) {
      throw new AppError('Ticket not found', 404)
    }

    // Проверка доступа
    if (userRole === 'EMPLOYEE' && ticket.createdById !== userId) {
      throw new AppError('Access denied', 403)
    }

    return ticket
  }

  static async getStatistics() {
    const total = await prisma.ticket.count()
    const resolved = await prisma.ticket.count({
      where: { status: { in: ['RESOLVED', 'CLOSED'] } }
    })
    const open = total - resolved

    const byPriority = await prisma.ticket.groupBy({
      by: ['priority'],
      _count: true
    })

    const byCategory = await prisma.ticket.groupBy({
      by: ['category'],
      _count: true
    })

    const byStatus = await prisma.ticket.groupBy({
      by: ['status'],
      _count: true
    })

    const avgResolutionTime = await prisma.ticket.aggregate({
      where: { status: { in: ['RESOLVED', 'CLOSED'] } },
      _avg: { timeToResolve: true }
    })

    return {
      total,
      open,
      resolved,
      resolutionRate: total > 0 ? Number((resolved / total * 100).toFixed(1)) : 0,
      byPriority,
      byCategory,
      byStatus,
      avgResolutionTime: Math.round(avgResolutionTime._avg.timeToResolve || 0)
    }
  }
}
