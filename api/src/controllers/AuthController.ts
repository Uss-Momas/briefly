import { FastifyReply, FastifyRequest } from "fastify";
import { authSignupRequestBodySchema } from "../validations/requests";
import userRepository from "../repositories/UserRepository";
import AppError from "../errors/AppError";
import authRepository from "../repositories/AuthRepository";

class AuthController {
    async signup(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password } = authSignupRequestBodySchema.parse(request.body);
        const user = await userRepository.getUserByEmail(email);

        if (user) throw new AppError(409, 'This email is already in use');

        const newUser = await authRepository.signup({ name, email, password });
        return reply.status(201).send({ message: 'Signup Successfully', user: newUser });
    }
}

const authController = new AuthController();
export default authController;