import { FastifyInstance } from "fastify";
import userController from "../controllers/UserController";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', async (request, reply) => userController.getAllUsers(request, reply));
    fastify.get('/:id', async (request, reply) => userController.getUser(request, reply));
    fastify.delete('/:id', async (request, reply) => userController.deleteUser(request, reply));
    fastify.post('/', async (request, reply) => userController.createUser(request, reply));
}