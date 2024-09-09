import { FastifyInstance } from "fastify";
import shortlinkController from "../controllers/ShortlinkController";

export default async function shortlinkRoutes(fastify: FastifyInstance) {
    fastify.post('/', async (request, reply) => shortlinkController.createShortlink(request, reply));
}