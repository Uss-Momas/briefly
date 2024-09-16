import AppError from "../errors/AppError";
import prismaClient from "../utils/prismaClient";
import userRepository from "./UserRepository";

interface ShortlinkRequestBody {
    code: string;
    originalUrl: string;
    userId?: string;
}


class ShortlinkRepository {
    async getAllShortlinks() {
        const shortlinks = await prismaClient.shortLink.findMany();
        return shortlinks;
    }

    async getShortlink(id: string) {
        const shortlink = await prismaClient.shortLink.findUnique({
            where: { id }
        })
        return shortlink;
    }

    async getShortlinkByCode(code: string) {
        const shortlink = await prismaClient.shortLink.findFirst({
            where: {
                code,
            }
        });
        return shortlink;
    }

    async createShortlink({ originalUrl, code, userId }: ShortlinkRequestBody) {
        const shortlink = await this.getShortlinkByCode(code);
        if (shortlink) throw new AppError(400, 'Code already in use!');
        if (userId) {
            const user = await userRepository.getUserById(userId);
            if (!user) throw new AppError(404, 'User Not Found!');
        }
        const newShortlink = await prismaClient.shortLink.create({
            data: {
                originalUrl,
                code,
                userId,
            }
        });

        return newShortlink;
    }

    async deleteShortlink(id: string) {
        const shortlink = await this.getShortlink(id);
        if (!shortlink) throw new AppError(404, 'Shortlink not found!');
        const deleted = await prismaClient.shortLink.delete({ where: { id } });
        return deleted;
    }
}

const shortlinkRepository = new ShortlinkRepository();
export default shortlinkRepository;