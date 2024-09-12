import fastifyCors from '@fastify/cors';
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt';
import * as dotenv from 'dotenv';
import routes from './routes/main.routes';
import { ZodError } from 'zod';
import AppError from './errors/AppError';

dotenv.config();

const server = fastify();

server.register(fastifyCors, {
    origin: ['http://localhost:5173'],
    credentials: true,
    // optionsSuccessStatus: 200,
});

server.register(routes, { prefix: '/api/v1' });

server.setErrorHandler(async (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ message: error.message });
    }
    if (error instanceof ZodError) {
        const messages = error.errors.map((e) => {
            return { field: e.path[0], message: e.message };
        });
        return reply.status(422).send({ message: 'Validation Errors!', errors: messages });
    }
    console.log(error);

    return reply.status(500).send({ message: "Internal Error" });
});

server.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});