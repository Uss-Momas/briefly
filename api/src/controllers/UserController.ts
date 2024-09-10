import { FastifyReply, FastifyRequest } from "fastify";
import userRepository from "../repositories/UserRepository";
import { idRequestParamSchema } from "../validations/requests";
import AppError from "../errors/AppError";

class UserController {
    async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
        const users = await userRepository.getAllUsers();
        return reply.send({ message: 'List of users', users });
    }

    async getUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idRequestParamSchema.parse(request.params);

        const user = await userRepository.getUserById(id);

        if (!user) throw new AppError(404, 'User Not found');

        return reply.send({ message: 'Here is user', user });
    }
    async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = idRequestParamSchema.parse(request.params);

        const user = await userRepository.getUserById(id);

        if (!user) throw new AppError(404, 'User Not found');

        await userRepository.deleteUserById(id);

        return reply.send({ message: 'User deleted sucessfuly', user });
    }
}

const userController = new UserController();

export default userController;