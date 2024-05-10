import { FlowRepository } from '@/repositories/flow-repository'

interface InsertFlowUseCaseRequest {
    filePath: string
}

export class InsertFlowUseCase {
    constructor(private flowRepository: FlowRepository) {}

    async execute({ filePath }: InsertFlowUseCaseRequest): Promise<void> {
        await this.flowRepository.createFromFilePath(filePath)

        return
    }
}
