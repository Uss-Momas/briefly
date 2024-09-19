import { redisClient } from "../utils/redisClient";

class MetricRepository {
    async clicksByShortlinkMetrics() {
        const result = await redisClient.zRangeByScoreWithScores('metrics', 0, 50);
        const metrics = result.sort((a, b) => b.score - a.score).map((item) => {
            return {
                shortLink: item.value,
                clicks: item.score,
            }
        });
        return metrics;
    }

    async clicksByShortlink(id: string){
        const result = await redisClient.zScore('metrics', id);
        return result ? result : 0;
    }
}

const metricRepository = new MetricRepository();

export default metricRepository;