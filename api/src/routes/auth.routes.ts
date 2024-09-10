import { FastifyInstance } from "fastify";
import authController from "../controllers/AuthController";

export default async function authRoutes(fastify:FastifyInstance) {
    fastify.post('/signup', async (request, reply) => authController.signup(request, reply));
}