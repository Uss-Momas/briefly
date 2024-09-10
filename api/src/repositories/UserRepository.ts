import prismaClient from "../utils/prismaClient";

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
        const user = await prismaClient.user.findUnique({ where: { id }, select: { id: true, name: true, email: true } });
        return user;
    }
}

const userRepository = new UserRepository();

export default userRepository;