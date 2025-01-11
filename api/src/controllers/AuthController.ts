import { FastifyReply, FastifyRequest } from "fastify";
import { authLoginRequestBodySchema, authSignupRequestBodySchema } from "../validations/requests";
import userRepository from "../repositories/UserRepository";
import AppError from "../errors/AppError";
import authRepository from "../repositories/AuthRepository";
import { comparePassword } from "../utils/hashPassword";

class AuthController {
    async signup(request: FastifyRequest, reply: FastifyReply) {
        const { firstName, lastName, email, password } = authSignupRequestBodySchema.parse(request.body);
        const user = await userRepository.getUserByEmail(email);

        if (user) throw new AppError(409, 'This email is already in use');

        const newUser = await authRepository.signup({ firstName, lastName, email, password });
        return reply.status(201).send({ message: 'Signup Successfully', user: newUser });
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = authLoginRequestBodySchema.parse(request.body);

        const user = await authRepository.login({ email, password });

        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }

        const token = request.jwt.sign(payload,);

        return reply.send({
            message: 'Login Successfully', token, user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });
    }
}

const authController = new AuthController();
export default authController;