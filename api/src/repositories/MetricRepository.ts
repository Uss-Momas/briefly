import { redisClient } from "../utils/redisClient";

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

    async generalStats() {
        return { totalLinks: 0, totalClicks: 0, monthClicks: 0 };
    }

    async mostClickedLinks() {
        return [];
    }
}

const metricRepository = new MetricRepository();

export default metricRepository;