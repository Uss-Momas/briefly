import { FastifyInstance } from "fastify";
import metricController from "../controllers/MetricController";

export default async function metricsRoutes(fastify: FastifyInstance) {
    fastify.get('/', async (request, reply) => metricController.getClicksByShortlinkMetrics(request, reply));
    fastify.get('/:shortlinkId', async (request, reply) => metricController.getClicksByShortlink(request, reply));
}