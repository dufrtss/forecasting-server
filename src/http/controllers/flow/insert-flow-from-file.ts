import { makeInsertFlowFromFileUseCase } from '@/use-cases/flow/factories/make-insert-flow-from-file-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function insertFlowFromFile(request: FastifyRequest, reply: FastifyReply) {
    const insertFlowFromFileBodySchema = z.object({
        filePath: z.string()
    })

    const { filePath } = insertFlowFromFileBodySchema.parse(request.body)

    try {
        const insertFlow = makeInsertFlowFromFileUseCase()
        await insertFlow.execute({
            filePath
        })
    } catch (err) {
        console.log(err)
    }

    return reply.status(201).send()
}
