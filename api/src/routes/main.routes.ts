import { FastifyInstance } from "fastify";

export default async function routes(fastify: FastifyInstance) {
    fastify.get('/status', (request, reply) => {
        reply.send("API WORKING")
    });
}