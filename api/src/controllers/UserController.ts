import { FastifyReply, FastifyRequest } from "fastify";
import userRepository from "../repositories/UserRepository";

class UserController {
    async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
        const users = await userRepository.getAllUsers();
        return reply.send({ message: 'List of users', users });
    }
}

const userController = new UserController();

export default userController;