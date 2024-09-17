import { FastifyReply, FastifyRequest } from "fastify";
import { paginationQuerySchema, shortlinkRequestBodySchema, shortlinkRequestParamSchema } from "../validations/requests";
import shortlinkRepository from "../repositories/ShortlinkRepository";
import { generateRandomCodeV2 } from "../utils/generateCode";
import AppError from "../errors/AppError";

class ShortlinkController {

    async getAllShortlinks(request: FastifyRequest, reply: FastifyReply) {
        const { page = 1, limit = 5 } = paginationQuerySchema.parse(request.query);
        const { shortlinks, meta } = await shortlinkRepository.getAllShortlinks({ page, limit });
        return reply.send({ message: 'All Shortlinks', shortlinks, meta });
    }

    async getShortlink(request: FastifyRequest, reply: FastifyReply) {
        const { id } = shortlinkRequestParamSchema.parse(request.params);
        const shortlink = await shortlinkRepository.getShortlink(id);

        if (!shortlink) throw new AppError(404, 'Shortlink not found!');
        return reply.send({ message: 'Shortlink is here', shortlink });
    }

    async createShortlinkByAnominous(request: FastifyRequest, reply: FastifyReply) {
        console.log('Anonimous LInk');

        const { originalUrl, code } = shortlinkRequestBodySchema.parse(request.body);
        const shortlink = await shortlinkRepository.createShortlink({ originalUrl, code: code ? code : await generateRandomCodeV2(6) });
        return reply.status(201).send({ message: 'Shortlink URL created with success', shortlink });
    }

    async createShortlink(request: FastifyRequest, reply: FastifyReply) {
        const { originalUrl, code } = shortlinkRequestBodySchema.parse(request.body);
        const user: any = request.user;
        const shortlink = await shortlinkRepository.createShortlink({ originalUrl, code: code ? code : await generateRandomCodeV2(6), userId: user.id });
        return reply.status(201).send({ message: 'Shortlink URL created with success', shortlink });
    }

    async deleteShortlink(request: FastifyRequest, reply: FastifyReply) {
        const { id } = shortlinkRequestParamSchema.parse(request.params);
        const shortlink = await shortlinkRepository.deleteShortlink(id);

        return reply.send({ message: 'Shortlink deleted', shortlink });
    }
}

const shortlinkController = new ShortlinkController();
export default shortlinkController;