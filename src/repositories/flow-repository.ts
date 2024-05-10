import { Flow } from '@prisma/client'

export interface FlowRepository {
    fetchByPeriod(startDate: Date, endDate: Date, isForecasting?: boolean): Promise<Flow[]>
    createFromFilePath(filePath: string): Promise<void>
}
