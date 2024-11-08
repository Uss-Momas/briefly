import { FastifyReply, FastifyRequest } from "fastify";
import userRepository from "../repositories/UserRepository";
import { idRequestParamSchema, updateUserSchema, userBodyRequestSchema } from "../validations/requests";
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

    async createUser(request: FastifyRequest, reply: FastifyReply) {
        const { firstName, lastName, email, password, roleCode } = userBodyRequestSchema.parse(request.body);

        const user = await userRepository.getUserByEmail(email);

        if (user) throw new AppError(409, 'This email is already in use');

        const newUser = await userRepository.createUser({ firstName, lastName, email, password, roleCode });

        return reply.status(201).send({ message: 'User created sucessfuly', user: newUser });
    }

    async updateUser(request: FastifyRequest, reply: FastifyReply) {
        const { firstName, lastName } = updateUserSchema.parse(request.body);
        const authenticatedUser: any = request.user;
        const user = await userRepository.getUserById(authenticatedUser.id);

        if (!user) throw new AppError(404, 'User Not found');

        const updatedUser = await userRepository.updateUser({ id: user.id, firstName, lastName });

        return reply.send({ message: "User updated sucessfuly", user: updatedUser });
    }
}

const userController = new UserController();

export default userController;