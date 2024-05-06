import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { authenticate } from './authenticate.js'
import { register } from './register.js'
import { profile } from './profile.js'
import { refresh } from './refresh.js'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    app.patch('/token/refresh', refresh)
    
    /* Authenticated */ 
    app.get('/me', { onRequest: [verifyJWT] }, profile)
}
