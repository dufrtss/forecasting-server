import { makeFetchFlowByPeriod } from '@/use-cases/flow/factories/make-fetch-flow-by-period-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface RequestQueryType {
    rangeFrom: number
    rangeTo: number
}

export async function fetchFlowByPeriod(request: FastifyRequest, reply: FastifyReply) {
    const fetchFlowByPeriodBodySchema = z.object({
        from: z.number(),
        to: z.number()
    })

    function hasRequestQuery(requestQuery: unknown): requestQuery is RequestQueryType {
        return (requestQuery as RequestQueryType).rangeFrom !== undefined
            && (requestQuery as RequestQueryType).rangeTo !== undefined
    }

    if (hasRequestQuery(request.query)) {
        const { from, to } = fetchFlowByPeriodBodySchema.parse({
            from: Number(request.query.rangeFrom),
            to: Number(request.query.rangeTo)
        })

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
    } else {
        throw new Error('Invalid Period Parameters.')
    }
}
