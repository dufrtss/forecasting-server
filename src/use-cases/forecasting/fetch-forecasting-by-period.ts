import { ForecastingRepository } from '@/repositories/forecasting-repository'
import { Forecasting } from '@prisma/client'

interface FetchForecastingByPeriodUseCaseRequest {
    from: number
    to: number
}

interface FetchForecastingByPeriodUseCaseResponse {
  forecasting: Forecasting[]
}

export class FetchForecastingByPeriodUseCase {
    constructor(private forecastingRepository: ForecastingRepository) {}

    async execute({ from, to }: FetchForecastingByPeriodUseCaseRequest): Promise<FetchForecastingByPeriodUseCaseResponse> {
        const forecasting = await this.forecastingRepository.fetchByPeriod(
            from, to
        )

        return {
            forecasting
        }
    }
}
