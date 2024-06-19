import { Forecasting } from '@prisma/client'

export interface ForecastingRepository {
    fetchByPeriod(from: number, to: number, isForecasting?: boolean): Promise<Forecasting[]>
}
