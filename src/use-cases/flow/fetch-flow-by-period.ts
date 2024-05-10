import { FlowRepository } from '@/repositories/flow-repository'
import { Flow } from '@prisma/client'

interface FetchFlowByPeriodUseCaseRequest {
    from: Date
    to: Date
}

interface FetchFlowByPeriodUseCaseResponse {
  flow: Flow[]
}

export class FetchFlowByPeriodUseCase {
    constructor(private flowRepository: FlowRepository) {}

    async execute({ from, to }: FetchFlowByPeriodUseCaseRequest): Promise<FetchFlowByPeriodUseCaseResponse> {
        const flow = await this.flowRepository.fetchByPeriod(
            from, to
        )

        return {
            flow
        }
    }
}
