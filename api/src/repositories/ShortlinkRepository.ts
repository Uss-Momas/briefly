import AppError from "../errors/AppError";
import prismaClient from "../utils/prismaClient";
import userRepository from "./UserRepository";

interface ShortlinkRequestBody {
    code: string;
    originalUrl: string;
    userId?: string;
}


interface PaginationType {
    page: number;
    limit: number;
}


class ShortlinkRepository {
    async getAllShortlinks({ page, limit }: PaginationType) {
        const skip = (page - 1) * limit;
        const totalLinks = await prismaClient.shortLink.count();
        const totalPages = Math.ceil(totalLinks / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        const shortlinks = await prismaClient.shortLink.findMany({
            skip, take: limit,
        });
        return {shortlinks, meta: {
            totalItems: totalLinks,
            totalPages,
            currentPage: page,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
        }};
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