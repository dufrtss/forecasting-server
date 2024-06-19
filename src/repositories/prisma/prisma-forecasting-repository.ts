import { ForecastingRepository } from '../forecasting-repository'
import { prisma } from '@/lib/prisma'

export class PrismaForecastingRepository implements ForecastingRepository {
    async fetchByPeriod(from: number, to: number) {
        console.log(from, to)
        const forecasting = await prisma.forecasting.findMany({
            where: {
                timestamp: {
                    gte: from,
                    lte: to
                }
            }
        })

        return forecasting
    }
}
