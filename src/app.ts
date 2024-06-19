import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env/index'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './http/controllers/users/routes'
import { flowRoutes } from './http/controllers/flow/routes'
import { forecastingRoutes } from './http/controllers/forecasting/routes'

export const app = fastify()

app.register(cors, {
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Origin'
    ],
    exposedHeaders: [
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Origin'
    ]
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(flowRoutes)
app.register(forecastingRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation Error.', issues: error.format()})
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal Server Error.'})
})
