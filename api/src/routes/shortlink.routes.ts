import { FastifyInstance } from "fastify";
import shortlinkController from "../controllers/ShortlinkController";

export default async function shortlinkRoutes(fastify: FastifyInstance) {
    fastify.get('/', async (request, reply) => shortlinkController.getAllShortlinks(request, reply));
    fastify.get('/:id', async (request, reply) => shortlinkController.getShortlink(request, reply));
    fastify.post('/', async (request, reply) => shortlinkController.createShortlink(request, reply));
}