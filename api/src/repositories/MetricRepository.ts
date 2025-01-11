import { User } from "@prisma/client";
import { redisClient } from "../utils/redisClient";
import prismaClient from "../utils/prismaClient";

class MetricRepository {
    async clicksByShortlinkMetrics() {
        if (redisClient.isReady) {
            const result = await redisClient.zRangeByScoreWithScores('metrics', 0, 50);
            const metrics = result.sort((a, b) => b.score - a.score).map((item) => {
                return {
                    shortLink: item.value,
                    clicks: item.score,
                }
            });
            return metrics;
        }
        return [];
    }

    async clicksByShortlink(id: string) {
        if (redisClient.isReady) {
            const result = await redisClient.zScore('metrics', id);
            return result ? result : 0;
        }
        return 0;
    }

    async adminGeneralStats() {
        const totalLinks = await prismaClient.shortLink.count();
        const linksOfMonth = await prismaClient.shortLink.findMany({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
                }
            }
        });
        let totalClicks = 0;
        let totalMonthClicks = 0;

        if (redisClient.isReady) {
            const clicks: any[] = await redisClient.zRangeWithScores('metrics', 0, -1);
            const monthClicks: any[] = await Promise.all(linksOfMonth.map(async (item) => {
                const score = await redisClient.zScore('metrics', item.id);
                return score;
            }));
            // Sum all the scores (clicks)
            totalClicks = clicks.map((item) => item.score).reduce((acc, curr) => acc + curr, 0);
            totalMonthClicks = monthClicks.reduce((acc, curr) => acc + curr, 0);
        }

        return { totalLinks: totalLinks, totalClicks, monthClicks: totalMonthClicks };
    }



    async generalStats(user: any) {
        if (user.role.designation === 'admin') {
            return this.adminGeneralStats();
        }
        const totalLinks = await prismaClient.shortLink.count({ where: { userId: user.id } });
        const links = await prismaClient.shortLink.findMany({ where: { userId: user.id } });
        const linksOfMonth = links.filter((item) => {
            const now = new Date();
            const createdAt = new Date(item.createdAt);
            return now.getMonth() === createdAt.getMonth();
        });
        let totalClicks = 0;
        let totalMonthClicks = 0;

        if (redisClient.isReady) {
            const clicks: any[] = await Promise.all(links.map(async (item) => {
                const score = await redisClient.zScore('metrics', item.id);
                console.log(score);
                return score;
            }));

            const monthClicks: any[] = await Promise.all(linksOfMonth.map(async (item) => {
                const score = await redisClient.zScore('metrics', item.id);
                return score;
            }));

            totalClicks = clicks.reduce((acc, curr) => acc + curr, 0);
            totalMonthClicks = monthClicks.reduce((acc, curr) => acc + curr, 0);
        }

        return { totalLinks: totalLinks, totalClicks, monthClicks: totalMonthClicks };
    }

    async mostClickedLinks() {
        return [];
    }
}

const metricRepository = new MetricRepository();

export default metricRepository;