import { ForecastingRepository } from '../forecasting-repository'
import { prisma } from '@/lib/prisma'

export class PrismaForecastingRepository implements ForecastingRepository {
    async fetchByPeriod(from: number, to: number) {
        const forecasting = await prisma.forecasting.findMany({
            where: {
                timestamp: {
                    gte: from,
                    lte: to
                }
            },
            orderBy: {
                timestamp: 'desc'
            }
        })

        return forecasting
    }
}
