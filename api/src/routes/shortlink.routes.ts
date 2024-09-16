import { FastifyInstance } from "fastify";
import shortlinkController from "../controllers/ShortlinkController";

export default async function shortlinkRoutes(fastify: FastifyInstance) {
    fastify.post('/anonimous', async (request, reply) => shortlinkController.createShortlinkByAnominous(request, reply));
    fastify.get('/', async (request, reply) => shortlinkController.getAllShortlinks(request, reply));
    fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (request, reply) => shortlinkController.getShortlink(request, reply));
    fastify.post('/', { onRequest: [fastify.authenticate] }, async (request, reply) => shortlinkController.createShortlink(request, reply));
    fastify.delete('/:id', { onRequest: [fastify.authenticate] }, async (request, reply) => shortlinkController.deleteShortlink(request, reply));
}