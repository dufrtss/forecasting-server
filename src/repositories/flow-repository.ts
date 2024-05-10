import { Flow } from '@prisma/client'

export interface FlowRepository {
    fetchByPeriod(from: Date, to: Date, isForecasting?: boolean): Promise<Flow[]>
    createFromFilePath(filePath: string): Promise<void>
}
