import { FastifyInstance } from "fastify";
import shortlinkRoutes from "./shortlink.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import handleJwtAuthPlugin from "../plugins/handleJwtAuthPlugin";

export default async function routes(fastify: FastifyInstance) {
    fastify.get('/status', (request, reply) => {
        reply.send("API WORKING")
    });

    fastify.register(handleJwtAuthPlugin);

    fastify.register(shortlinkRoutes, { prefix: 'shortlinks' });
    fastify.register(userRoutes, { prefix: 'users' });
    fastify.register(authRoutes, { prefix: 'auth' });
}