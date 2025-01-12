import { ShortLink, User } from "@prisma/client";
import prismaClient from "../utils/prismaClient";
import metricRepository from "./MetricRepository";

interface ShortlinkExtended extends ShortLink {
    user: {
        email: string,
    } | null
}

interface UserType extends User {
    role: {
        designation: string;
    };
}

interface PageType {
    page: number;
    limit: number;
    user: UserType;
}

class AdminRepository {
    async getAllShortlinks({ page, limit, user }: PageType) {
        const skip = (page - 1) * limit;
        const totalLinks = await prismaClient.shortLink.count();
        const totalPages = Math.ceil(totalLinks / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        let shortlinks: ShortlinkExtended[] = [];

        shortlinks = await prismaClient.shortLink.findMany({
            skip, take: limit,
            orderBy: {
                createdAt: "desc",
            }, select: {
                code: true,
                createdAt: true,
                id: true,
                originalUrl: true,
                userId: true,
                updatedAt: true,
                user: {
                    select: {
                        email: true,
                    }
                }
            }
        });

        const shortlinksWithClicks = await Promise.all(
            shortlinks.map(async (shortlink: ShortlinkExtended) => {
                const clicks = await metricRepository.clicksByShortlink(shortlink.id);
                return {
                    originalUrl: shortlink.originalUrl,
                    code: shortlink.code,
                    id: shortlink.id,
                    createdAt: shortlink.createdAt,
                    userId: shortlink.userId,
                    user: shortlink.user ? shortlink.user : { email: 'anonimous' },
                    clicks: clicks ? clicks : 0,
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

    async getGeneralStats() {
        const data = await metricRepository.adminGeneralStats();
        return data;
    }
}

const adminRepository = new AdminRepository();
export default adminRepository;