import hashPassword from "../utils/hashPassword";
import prismaClient from "../utils/prismaClient";

interface UserBodyType {
    name: string,
    email: string,
    password: string,
    roleCode: string,
}

class UserRepository {
    async getAllUsers() {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            }
        })
        return users;
    }

    async getUserById(id: string) {
        const user = await prismaClient.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true } });
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await prismaClient.user.findUnique({ where: { email }, select: { id: true, name: true, email: true, role: true, password: true } });
        return user;
    }

    async deleteUserById(id: string) {
        const user = await prismaClient.user.delete({ where: { id }, select: { id: true, name: true, email: true } });
        return user;
    }

    async createUser({ name, email, password, roleCode }: UserBodyType) {
        const hashedPwd = hashPassword(password);
        const user = await prismaClient.user.create({
            data: {
                name, email, password: hashedPwd, roleCode
            }, select: {
                id: true, name: true, email: true, role: true,
            }
        })
        return user;
    }
    
}

const userRepository = new UserRepository();

export default userRepository;