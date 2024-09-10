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
}

const userRepository = new UserRepository();

export default userRepository;