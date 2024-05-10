import * as fs from 'fs'
import { FlowRepository } from '../flow-repository'
import { prisma } from '@/lib/prisma'

export class PrismaFlowRepository implements FlowRepository {
    async fetchByPeriod(from: Date, to: Date) {
        const flow = await prisma.flow.findMany({
            where: {
                date: {
                    gte: from,
                    lte: to
                }
            }
        })

        return flow
    }

    async createFromFilePath(filePath: string) {
        const jsonData = fs.readFileSync(filePath, 'utf-8')
        const flowData = JSON.parse(jsonData)

        for (const flow of flowData) {
            if(flow.flow !== 'NaN') {
                await prisma.flow.create({
                    data: {
                        value: parseFloat(flow.flow),
                        date: flow.date,
                        confidenceInterval: flow.confidenceInterval,
                        isForecasting: flow.isForecasting
                    }
                })
            }
        }
    }
}
