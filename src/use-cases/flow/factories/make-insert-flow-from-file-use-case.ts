import { PrismaFlowRepository } from '@/repositories/prisma/prisma-flow-repository'
import { InsertFlowUseCase } from '../insert-flow-from-file'

export function makeInsertFlowFromFileUseCase() {
    const prismaFlowRepository = new PrismaFlowRepository()
    const insertFlowUseCase = new InsertFlowUseCase(prismaFlowRepository)

    return insertFlowUseCase
}
