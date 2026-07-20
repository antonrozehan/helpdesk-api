import { Router } from 'express'
import * as DashboardController from '../controllers/dashboard.controller'
import { auth, requireRole } from '../middleware/auth'

const router = Router()

router.use(auth)
router.get('/stats', requireRole(['ADMIN', 'IT_SPECIALIST']), DashboardController.getDashboardStats)

export default router
