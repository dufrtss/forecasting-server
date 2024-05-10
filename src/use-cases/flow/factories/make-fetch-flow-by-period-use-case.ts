import { PrismaFlowRepository } from '@/repositories/prisma/prisma-flow-repository'
import { FetchFlowByPeriodUseCase } from '../fetch-flow-by-period'

export function makeFetchFlowByPeriod() {
    const prismaFlowRepository = new PrismaFlowRepository()
    const fetchFlowByPeriodUseCase = new FetchFlowByPeriodUseCase(prismaFlowRepository)

    return fetchFlowByPeriodUseCase
}
