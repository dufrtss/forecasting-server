import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetchFlowByPeriod } from './fetch-flow-by-period'
import { insertFlowFromFile } from './insert-flow-from-file'

export async function flowRoutes(app: FastifyInstance) {
    app.get('/flow', { onRequest: [verifyJWT] }, fetchFlowByPeriod)
    app.post('/flow', { onRequest: [verifyJWT] }, insertFlowFromFile)
}
