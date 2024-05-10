import { FlowRepository } from '@/repositories/flow-repository'
import { Flow } from '@prisma/client'

interface FetchFlowByPeriodUseCaseRequest {
    startDate: Date
    endDate: Date
    isForecasting?: boolean
}

interface FetchFlowByPeriodUseCaseResponse {
  flow: Flow[]
}

export class FetchFlowByPeriodUseCase {
    constructor(private flowRepository: FlowRepository) {}

    async execute({ startDate, endDate, isForecasting }: FetchFlowByPeriodUseCaseRequest): Promise<FetchFlowByPeriodUseCaseResponse> {
        const flow = await this.flowRepository.fetchByPeriod(
            startDate, endDate, isForecasting
        )

        return {
            flow
        }
    }
}
