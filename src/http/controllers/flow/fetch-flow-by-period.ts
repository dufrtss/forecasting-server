import { makeFetchFlowByPeriod } from '@/use-cases/flow/factories/make-fetch-flow-by-period-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchFlowByPeriod(request: FastifyRequest, reply: FastifyReply) {
    const fetchFlowByPeriodBodySchema = z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        isForecasting: z.boolean().optional()
    }).default({
        startDate: new Date(new Date().getTime() - (14 * 24 * 60 * 60 * 1000)),
        endDate: new Date()
    })

    const { startDate, endDate, isForecasting } = fetchFlowByPeriodBodySchema.parse(request.body)

    if (!startDate || !endDate) {
        return null
    }

    try {
        const fetchFlowByPeriod = makeFetchFlowByPeriod()
        const flow = await fetchFlowByPeriod.execute({
            startDate, endDate, isForecasting
        })

        return flow
    } catch (err) {
        console.log(err)
    }

    return reply.status(200).send()
}
