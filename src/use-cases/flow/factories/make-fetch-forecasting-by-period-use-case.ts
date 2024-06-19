import { PrismaForecastingRepository } from '@/repositories/prisma/prisma-forecasting-repository'
import { FetchForecastingByPeriodUseCase } from '@/use-cases/forecasting/fetch-forecasting-by-period'

export function makeFetchForecastingByPeriod() {
    const prismaForecastingRepository = new PrismaForecastingRepository()
    const fetchForecastingByPeriodUseCase = new FetchForecastingByPeriodUseCase(prismaForecastingRepository)

    return fetchForecastingByPeriodUseCase
}
