import { Flow } from '@prisma/client'

export interface FlowRepository {
    fetchByPeriod(from: number, to: number, isForecasting?: boolean): Promise<Flow[]>
    createFromFilePath(filePath: string): Promise<void>
}
