import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { initDb } from './database'
import { errorHandler } from './middleware/errorHandler'
import { setupSwagger } from './swagger'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Swagger документация
setupSwagger(app)

let db: any
initDb().then(d => { db = d })

// === СТРАНИЦЫ ===
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/tickets', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/dashboard', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// === API ===

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Проверка работоспособности сервера
 *     description: Возвращает статус сервера и текущее время
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Сервер работает
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   example: 2024-01-01T00:00:00.000Z
 */
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя в системе
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@company.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *               name:
 *                 type: string
 *                 example: John Doe
 *               department:
 *                 type: string
 *                 example: IT
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: User created
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name, department } = req.body
        const bcrypt = require('bcryptjs')
        const { v4: uuidv4 } = require('uuid')
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const id = uuidv4()
        
        await db.run(
            'INSERT INTO users (id, email, password, name, department) VALUES (?, ?, ?, ?, ?)',
            [id, email, hashedPassword, name, department || '']
        )
        
        const user = await db.get('SELECT id, email, name, role, department FROM users WHERE id = ?', [id])
        return res.status(201).json({ user, message: 'User created' })
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
})

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход в систему
 *     description: Авторизация пользователя и получение JWT токена
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@company.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Неверные учетные данные
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const bcrypt = require('bcryptjs')
        const jwt = require('jsonwebtoken')
        
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email])
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        )
        
        const { password: _, ...userWithoutPassword } = user
        return res.json({ user: userWithoutPassword, token })
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
})

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Создание новой заявки
 *     description: Создает новую IT-заявку
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Printer not working
 *               description:
 *                 type: string
 *                 example: HP LaserJet shows Paper Jam error
 *               category:
 *                 type: string
 *                 enum: [HARDWARE, SOFTWARE, NETWORK, ACCESS, OTHER]
 *                 example: HARDWARE
 *               priority:
 *                 type: string
 *                 enum: [CRITICAL, HIGH, MEDIUM, LOW]
 *                 example: HIGH
 *     responses:
 *       201:
 *         description: Заявка создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Не авторизован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/tickets', async (req, res) => {
    try {
        const { title, description, category, priority } = req.body
        const { v4: uuidv4 } = require('uuid')
        const id = uuidv4()
        const slaDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        
        await db.run(
            `INSERT INTO tickets (id, title, description, category, priority, sla_deadline, created_by, status, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
            [id, title, description, category, priority || 'MEDIUM', slaDeadline, 'admin', 'NEW']
        )
        
        const ticket = await db.get('SELECT * FROM tickets WHERE id = ?', [id])
        return res.status(201).json(ticket)
    } catch (error: any) {
        console.error('Create ticket error:', error)
        return res.status(400).json({ error: error.message })
    }
})

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Получить все заявки
 *     description: Возвращает список всех заявок, отсортированных по дате создания
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [NEW, IN_PROGRESS, RESOLVED, CLOSED]
 *         description: Фильтр по статусу
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [CRITICAL, HIGH, MEDIUM, LOW]
 *         description: Фильтр по приоритету
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [HARDWARE, SOFTWARE, NETWORK, ACCESS, OTHER]
 *         description: Фильтр по категории
 *     responses:
 *       200:
 *         description: Список заявок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Не авторизован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/tickets', async (_req, res) => {
    try {
        const tickets = await db.all('SELECT * FROM tickets ORDER BY created_at DESC')
        return res.json(tickets)
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * @swagger
 * /api/tickets/{id}/status:
 *   put:
 *     summary: Изменить статус заявки
 *     description: Обновляет статус существующей заявки
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID заявки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [NEW, IN_PROGRESS, RESOLVED, CLOSED]
 *                 example: IN_PROGRESS
 *     responses:
 *       200:
 *         description: Статус обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Status updated
 *                 ticket:
 *                   $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Заявка не найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Не авторизован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.put('/api/tickets/:id/status', async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        
        const ticket = await db.get('SELECT * FROM tickets WHERE id = ?', [id])
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' })
        }
        
        await db.run(
            'UPDATE tickets SET status = ? WHERE id = ?',
            [status, id]
        )
        
        const updated = await db.get('SELECT * FROM tickets WHERE id = ?', [id])
        return res.json({ 
            message: 'Status updated', 
            ticket: updated 
        })
    } catch (error: any) {
        console.error('Update status error:', error)
        return res.status(500).json({ error: error.message })
    }
})

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Удалить заявку
 *     description: Удаляет заявку по ID
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID заявки
 *     responses:
 *       200:
 *         description: Заявка удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ticket deleted
 *                 id:
 *                   type: string
 *       404:
 *         description: Заявка не найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Не авторизован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete('/api/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params
        
        const ticket = await db.get('SELECT * FROM tickets WHERE id = ?', [id])
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' })
        }
        
        await db.run('DELETE FROM tickets WHERE id = ?', [id])
        return res.json({ message: 'Ticket deleted', id })
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Получить статистику по заявкам
 *     description: Возвращает общую статистику по заявкам
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Статистика
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 overview:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 10
 *                     open:
 *                       type: integer
 *                       example: 3
 *                     inProgress:
 *                       type: integer
 *                       example: 4
 *                     resolved:
 *                       type: integer
 *                       example: 2
 *                     closed:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Не авторизован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/dashboard/stats', async (_req, res) => {
    try {
        const total = await db.get('SELECT COUNT(*) as count FROM tickets')
        const open = await db.get("SELECT COUNT(*) as count FROM tickets WHERE status = 'NEW'")
        const inProgress = await db.get("SELECT COUNT(*) as count FROM tickets WHERE status = 'IN_PROGRESS'")
        const resolved = await db.get("SELECT COUNT(*) as count FROM tickets WHERE status = 'RESOLVED'")
        const closed = await db.get("SELECT COUNT(*) as count FROM tickets WHERE status = 'CLOSED'")
        
        return res.json({
            overview: {
                total: total?.count || 0,
                open: open?.count || 0,
                inProgress: inProgress?.count || 0,
                resolved: resolved?.count || 0,
                closed: closed?.count || 0
            }
        })
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log('🚀 Server running on http://localhost:' + PORT)
    console.log('📊 Health: http://localhost:' + PORT + '/health')
    console.log('📚 Swagger: http://localhost:' + PORT + '/api-docs')
    console.log('📚 API: http://localhost:' + PORT + '/api/tickets')
    console.log('🌐 Main page: http://localhost:' + PORT)
})
