import { FastifyInstance } from "fastify";
import userController from "../controllers/UserController";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        preHandler: async (request, reply) => {
            const { page = 1, limit = 5 }: any = request.query;
            const query = {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
            };

            request.query = query;
        },
        onRequest: [fastify.authenticate],
    }, async (request, reply) => userController.getAllUsers(request, reply));
    fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (request, reply) => userController.getUser(request, reply));
    fastify.delete('/:id', { onRequest: [fastify.authenticate] }, async (request, reply) => userController.deleteUser(request, reply));
    fastify.post('/', { onRequest: [fastify.authenticate] }, async (request, reply) => userController.createUser(request, reply));
    fastify.put('/:id', { onRequest: [fastify.authenticate] }, async (request, reply) => userController.updateUser(request, reply));
    fastify.patch('/:id', { onRequest: [fastify.authenticate] }, async (request, reply) => userController.updateUserPassword(request, reply));
}