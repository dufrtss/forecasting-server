import { makeFetchForecastingByPeriod } from '@/use-cases/flow/factories/make-fetch-forecasting-by-period-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface RequestQueryType {
    rangeFrom: number
    rangeTo: number
}

export async function fetchForecastingByPeriod(request: FastifyRequest, reply: FastifyReply) {
    const fetchForecastingByPeriodBodySchema = z.object({
        from: z.number(),
        to: z.number()
    })

    function hasRequestQuery(requestQuery: unknown): requestQuery is RequestQueryType {
        return (requestQuery as RequestQueryType).rangeFrom !== undefined
            && (requestQuery as RequestQueryType).rangeTo !== undefined
    }

    if (hasRequestQuery(request.query)) {
        const { from, to } = fetchForecastingByPeriodBodySchema.parse({
            from: Number(request.query.rangeFrom),
            to: Number(request.query.rangeTo)
        })

        if (!from || !to) {
            return null
        }

        try {
            const fetchForecastingByPeriod = makeFetchForecastingByPeriod()
            const forecasting = await fetchForecastingByPeriod.execute({
                from, to
            })
    
            return forecasting
        } catch (err) {
            console.log(err)
        }
    
        return reply.status(200).send()
    } else {
        throw new Error('Invalid Period Parameters.')
    }
}
