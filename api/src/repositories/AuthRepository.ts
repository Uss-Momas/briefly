import prismaClient from "../utils/prismaClient";
import Role from "../models/Role";
import userRepository from "./UserRepository";
import { comparePassword } from "../utils/hashPassword";
import AppError from "../errors/AppError";

interface SignupInterface {
    name: string,
    email: string,
    password: string,
}

interface LoginInterface {
    email: string,
    password: string,
}

class AuthRepository {
    async signup({ name, email, password }: SignupInterface) {
        const user = await userRepository.createUser({ name, email, password, roleCode: Role.NORMAL });
        return user;
    }

    async login({ email, password }: LoginInterface) {
        const user = await userRepository.getUserByEmail(email);

        if (!user) throw new AppError(404, 'Email not found!');

        const isMatch = comparePassword(password, user.password);

        if (!isMatch) throw new AppError(401, 'Password is wrong!');

        return user;

    }
}

const authRepository = new AuthRepository();
export default authRepository;