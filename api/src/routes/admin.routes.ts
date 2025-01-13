import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import adminController from "../controllers/AdminController";

export default async function adminRoutes(fastify: FastifyInstance) {
    fastify.get('/shortlinks', {
        preHandler: async (request, reply) => {
            const { page = 1, limit = 5 }: any = request.query;
            const query = {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
            };
            request.query = query;
        },
        onRequest: [fastify.authenticate],
    }, async (request: FastifyRequest, reply: FastifyReply) => adminController.getAllShortlinks(request, reply));
    fastify.get('/metrics/general-stats', { onRequest: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => adminController.getGeneralStats(request, reply));

    fastify.get('/metrics/most-clicked', { onRequest: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => adminController.getMostClickedLinks(request, reply));
}