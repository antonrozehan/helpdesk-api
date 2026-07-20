import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Helpdesk API',
      version: '1.0.0',
      description: 'API для управления IT-заявками',
      contact: {
        name: 'Developer',
        email: 'dev@company.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Ticket: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            category: { 
              type: 'string',
              enum: ['HARDWARE', 'SOFTWARE', 'NETWORK', 'ACCESS', 'OTHER']
            },
            priority: {
              type: 'string',
              enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']
            },
            status: {
              type: 'string',
              enum: ['NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']
            },
            created_at: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/server.ts']
}

export const setupSwagger = (app: Express) => {
  const specs = swaggerJsdoc(options)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
