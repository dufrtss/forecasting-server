import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
    await prisma.user.create({
        data: {
            name: 'John Doe',
            company: 'SATC',
            number: '+55(48)99882-9292',
            email: 'johndoe@example.com',
            password: await hash('123456', 6)
        }
    })

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'johndoe@example.com',
            password: '123456'
        })

    const { token } = authResponse.body

    return {
        token
    }
}
