import { User } from "@prisma/client";
import AppError from "../errors/AppError";
import prismaClient from "../utils/prismaClient";
import userRepository from "./UserRepository";
import metricRepository from "./MetricRepository";

interface ShortlinkRequestBody {
    code: string;
    originalUrl: string;
    userId?: string;
}


interface PageType {
    page: number;
    limit: number;
    user: User;
}


class ShortlinkRepository {
    async getAllShortlinks({ page, limit, user }: PageType) {
        const skip = (page - 1) * limit;
        const totalLinks = await prismaClient.shortLink.count({ where: { userId: user.id } });
        const totalPages = Math.ceil(totalLinks / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        const shortlinks = await prismaClient.shortLink.findMany({
            skip, take: limit,
            orderBy: {
                createdAt: "desc",
            },
            where: {
                userId: user.id,
            }
        });
        const shortlinksWithClicks = await Promise.all(
            shortlinks.map(async (shortlink) => {
                const clicks = await metricRepository.clicksByShortlink(shortlink.id);
                return {
                    originalUrl: shortlink.originalUrl,
                    code: shortlink.code,
                    id: shortlink.id,
                    createdAt: shortlink.createdAt,
                    userId: shortlink.userId,
                    clicks
                };
            })
        );

        return {
            shortlinks: shortlinksWithClicks, meta: {
                totalItems: totalLinks,
                totalPages,
                currentPage: page,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
            }
        };
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