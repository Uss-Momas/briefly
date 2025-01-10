import hashPassword from "../utils/hashPassword";
import prismaClient from "../utils/prismaClient";

interface UserBodyType {
    firstName: string,
    lastName?: string,
    email: string,
    password: string,
    roleCode: string,
}

interface UpdateUserInterface {
    id: string,
    firstName: string,
    lastName?: string,
}

class UserRepository {
    async getAllUsers() {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
            }
        })
        return users;
    }

    async getUserById(id: string) {
        const user = await prismaClient.user.findUnique({ where: { id }, select: { id: true, firstName: true, lastName: true, email: true, role: true } });
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await prismaClient.user.findUnique({ where: { email }, select: { id: true, lastName: true, firstName: true, email: true, role: true, password: true } });
        return user;
    }

    async deleteUserById(id: string) {
        const user = await prismaClient.user.delete({ where: { id }, select: { id: true, lastName: true, firstName: true, email: true } });
        return user;
    }

    async createUser({ firstName, lastName, email, password, roleCode }: UserBodyType) {
        const hashedPwd = hashPassword(password);
        const user = await prismaClient.user.create({
            data: {
                firstName, lastName, email, password: hashedPwd, roleCode
            }, select: {
                id: true, firstName: true, lastName: true, email: true, role: true,
            }
        })
        return user;
    }

    async updateUser({ id, firstName, lastName }: UpdateUserInterface) {
        const user = await prismaClient.user.update({
            where: { id }, data: {
                firstName, lastName,
            }, select: {
                firstName: true,
                lastName: true,
            }
        });
        return user;
    }

    async updateUserPassword(userId: string, newPassword: string) {
        const hashedPwd = hashPassword(newPassword);
        const user = await prismaClient.user.update({
            where: { id: userId },
            data: {
                password: hashedPwd,
            }, select: {
                firstName: true,
                lastName: true,
            },
        });
        return user;
    }
}

const userRepository = new UserRepository();

export default userRepository;