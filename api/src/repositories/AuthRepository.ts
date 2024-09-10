import Role from "../models/Role";
import hashPassword from "../utils/hashPassword";
import prismaClient from "../utils/prismaClient";
import userRepository from "./UserRepository";

interface SignupInterface {
    name: string,
    email: string,
    password: string,
}

class AuthRepository {
    async signup({ name, email, password }: SignupInterface) {
        const user = await userRepository.createUser({ name, email, password, roleCode: Role.NORMAL });
        return user;
    }
}

const authRepository = new AuthRepository();
export default authRepository;