import { FastifyReply, FastifyRequest } from "fastify";
import { paginationQuerySchema } from "../validations/requests";
import adminRepository from "../repositories/AdminRepository";

class AdminController {
    async getAllShortlinks(request: FastifyRequest, reply: FastifyReply) {
        const { page = 1, limit = 5 } = paginationQuerySchema.parse(request.query);
        const user: any = request.user;

        const { shortlinks, meta } = await adminRepository.getAllShortlinks({ page, limit, user });

        return reply.send({ message: 'All Shortlinks', shortlinks, meta });
    }

    async getGeneralStats(request: FastifyRequest, reply: FastifyReply) {
        const stats = await adminRepository.getGeneralStats();
        return reply.send({ message: 'General statistics', statistics: stats });
    }
}

const adminController = new AdminController();
export default adminController;