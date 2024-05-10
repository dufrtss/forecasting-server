import { makeFetchFlowByPeriod } from '@/use-cases/flow/factories/make-fetch-flow-by-period-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchFlowByPeriod(request: FastifyRequest, reply: FastifyReply) {
    const fetchFlowByPeriodBodySchema = z.object({
        from: z.date().optional(),
        to: z.date().optional()
    }).default({
        from: new Date('2024-04-08T03:00:00.000Z'),
        to: new Date('2024-04-15T03:00:00.000Z')
    })

    const normalizedParams = {
        from: new Date(request.query['range[from]']),
        to: new Date(request.query['range[to]'])
    }    

    const { from, to } = fetchFlowByPeriodBodySchema.parse(normalizedParams)

    if (!from || !to) {
        return null
    }

    try {
        const fetchFlowByPeriod = makeFetchFlowByPeriod()
        const flow = await fetchFlowByPeriod.execute({
            from, to
        })

        return flow
    } catch (err) {
        console.log(err)
    }

    return reply.status(200).send()
}
