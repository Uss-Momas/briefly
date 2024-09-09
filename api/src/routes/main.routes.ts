import { FastifyInstance } from "fastify";
import shortlinkRoutes from "./shortlink.routes";

export default async function routes(fastify: FastifyInstance) {
    fastify.get('/status', (request, reply) => {
        reply.send("API WORKING")
    });

    fastify.register(shortlinkRoutes, { prefix: 'shortlinks' });
}