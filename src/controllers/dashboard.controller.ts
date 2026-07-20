import { Request, Response } from 'express'
import prisma from '../config/database'
import { AppError } from '../middleware/errorHandler'

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Общая статистика
    const total = await prisma.ticket.count()
    const resolved = await prisma.ticket.count({
      where: { status: { in: ['RESOLVED', 'CLOSED'] } }
    })
    const open = total - resolved

    // SLA нарушения
    const slaViolations = await prisma.ticket.count({
      where: {
        status: { notIn: ['RESOLVED', 'CLOSED'] },
        slaDeadline: { lt: new Date() }
      }
    })

    // Топ исполнителей
    const topPerformers = await prisma.user.findMany({
      where: { role: 'IT_SPECIALIST' },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            assignedTickets: {
              where: { status: { in: ['RESOLVED', 'CLOSED'] } }
            }
          }
        }
      },
      orderBy: {
        assignedTickets: { _count: 'desc' }
      },
      take: 5
    })

    // Среднее время решения
    const avgTime = await prisma.ticket.aggregate({
      where: { status: { in: ['RESOLVED', 'CLOSED'] } },
      _avg: { timeToResolve: true }
    })

    // Заявки по категориям
    const byCategory = await prisma.ticket.groupBy({
      by: ['category'],
      _count: true
    })

    // Заявки по дням (последние 7 дней)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const dailyStats = await prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count,
        COUNT(CASE WHEN status IN ('RESOLVED', 'CLOSED') THEN 1 END) as resolved
      FROM "Ticket"
      WHERE created_at >= ${sevenDaysAgo}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `

    res.json({
      overview: {
        total,
        open,
        resolved,
        resolutionRate: total > 0 ? Number((resolved / total * 100).toFixed(1)) : 0
      },
      sla: {
        violations: slaViolations,
        complianceRate: total > 0 ? Number(((total - slaViolations) / total * 100).toFixed(1)) : 100
      },
      avgResolutionTime: Math.round(avgTime._avg.timeToResolve || 0),
      topPerformers: topPerformers.map(p => ({
        name: p.name,
        resolvedTickets: p._count.assignedTickets
      })),
      byCategory,
      dailyStats: dailyStats || []
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
}
