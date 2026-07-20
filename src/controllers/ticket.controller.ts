import { Request, Response } from 'express'
import { TicketService } from '../services/ticket.service'
import { createTicketSchema, updateStatusSchema, assignTicketSchema } from '../utils/validators'
import { AppError } from '../middleware/errorHandler'

export const createTicket = async (req: Request, res: Response) => {
  try {
    const data = createTicketSchema.parse(req.body)
    const ticket = await TicketService.createTicket(data, req.user!.id)
    res.status(201).json(ticket)
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

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await TicketService.getTickets(
      req.query,
      req.user!.id,
      req.user!.role
    )
    res.json(tickets)
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
}

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const ticket = await TicketService.getTicketById(id, req.user!.id, req.user!.role)
    res.json(ticket)
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
}

export const assignTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = assignTicketSchema.parse(req.body)
    
    if (req.user!.role === 'EMPLOYEE') {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    const ticket = await TicketService.assignTicket(id, data, req.user!.id)
    res.json(ticket)
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

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = updateStatusSchema.parse(req.body)
    
    const ticket = await TicketService.updateStatus(id, data, req.user!.id)
    res.json(ticket)
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

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const stats = await TicketService.getStatistics()
    res.json(stats)
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
}
