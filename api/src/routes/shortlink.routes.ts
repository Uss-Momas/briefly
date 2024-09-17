import { FastifyInstance } from "fastify";
import shortlinkController from "../controllers/ShortlinkController";

export default async function shortlinkRoutes(fastify: FastifyInstance) {
    fastify.post('/anonimous', async (request, reply) => shortlinkController.createShortlinkByAnominous(request, reply));
    fastify.get('/code/:code', async (request, reply) => shortlinkController.getOriginalUrlByCode(request, reply));
    fastify.get('/', {
        preHandler: async (request, reply) => {
            const { page = 1, limit = 5 }: any = request.query;
            const query = {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
            };

            request.query = query;
        },
    }, async (request, reply) => shortlinkController.getAllShortlinks(request, reply));
    fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (request, reply) => shortlinkController.getShortlink(request, reply));
    fastify.post('/', { onRequest: [fastify.authenticate] }, async (request, reply) => shortlinkController.createShortlink(request, reply));
    fastify.delete('/:id', { onRequest: [fastify.authenticate] }, async (request, reply) => shortlinkController.deleteShortlink(request, reply));
}