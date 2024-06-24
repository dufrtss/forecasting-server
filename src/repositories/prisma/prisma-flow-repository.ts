import * as fs from 'fs'
import { FlowRepository } from '../flow-repository'
import { prisma } from '@/lib/prisma'

export class PrismaFlowRepository implements FlowRepository {
    async fetchByPeriod(from: number, to: number) {
        const flow = await prisma.flow.findMany({
            where: {
                timestamp: {
                    gte: from,
                    lte: to
                }
            },
            orderBy: {
                timestamp: 'desc'
            }
        })

        return flow
    }

    async createFromFilePath(filePath: string) {
        const jsonData = fs.readFileSync(filePath, 'utf-8')
        const flowData = JSON.parse(jsonData)

        for (const flow of flowData['logger-history']) {
            if (flow && flow.value && flow.value !== 'NaN' && flow.value !== 'null' && flow.value !== 'Set to Bad') {
                console.log(flow.value, flow.timestamp)
                await prisma.flow.create({
                    data: {
                        value: parseFloat(flow.value),
                        timestamp: flow.timestamp / 1000
                    }
                })
            }
        }
    }
}
