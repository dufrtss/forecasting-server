import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetchForecastingByPeriod } from './fetch-forecasting-by-period'

export async function forecastingRoutes(app: FastifyInstance) {
    app.get('/forecasting', { onRequest: [verifyJWT] }, fetchForecastingByPeriod)
}
