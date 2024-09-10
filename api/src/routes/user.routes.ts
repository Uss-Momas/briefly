import { FastifyInstance } from "fastify";
import userController from "../controllers/UserController";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', async (request, reply) => userController.getAllUsers(request, reply));
    fastify.get('/:id', async (request, reply) => userController.getUser(request, reply));
}