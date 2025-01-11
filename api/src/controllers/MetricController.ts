import { FastifyReply, FastifyRequest } from "fastify";
import metricRepository from "../repositories/MetricRepository";

class MetricController {
    async getClicksByShortlinkMetrics(request: FastifyRequest, reply: FastifyReply) {
        const metrics = await metricRepository.clicksByShortlinkMetrics();
        return reply.send({ message: 'Metrics of application', metrics });
    }

    async getClicksByShortlink(request: FastifyRequest, reply: FastifyReply) {
        const { shortlinkId }: any = request.params
        const clicks = await metricRepository.clicksByShortlink(shortlinkId);
        return reply.send({ message: 'Clicks ', clicks });
    }

    async getGeneralStats(request: FastifyRequest, reply: FastifyReply) {
        const authenticatedUser: any = request.user;
        const stats = await metricRepository.generalStats(authenticatedUser);
        return reply.send({ message: 'General statistics', statistics: stats });
    }

    async getMostClickedLinks(request: FastifyRequest, reply: FastifyReply) {
        const data = await metricRepository.mostClickedLinks();
        return reply.send({ message: 'Most clicked links', links: data });
    }
}

const metricController = new MetricController();
export default metricController;