import { Router } from 'express'
import * as TicketController from '../controllers/ticket.controller'
import { auth, requireRole } from '../middleware/auth'

const router = Router()

// Все маршруты требуют аутентификации
router.use(auth)

// Основные маршруты
router.get('/', TicketController.getTickets)
router.post('/', TicketController.createTicket)
router.get('/:id', TicketController.getTicketById)

// Маршруты для управления
router.put('/:id/assign', requireRole(['ADMIN', 'IT_SPECIALIST']), TicketController.assignTicket)
router.put('/:id/status', TicketController.updateStatus)

// Статистика (только для админов и IT)
router.get('/statistics/all', requireRole(['ADMIN', 'IT_SPECIALIST']), TicketController.getStatistics)

export default router
