import { FastifyReply, FastifyRequest } from "fastify";
import { shortlinkRequestBodySchema, shortlinkRequestParamSchema } from "../validations/requests";
import shortlinkRepository from "../repositories/ShortlinkRepository";
import { generateRandomCodeV2 } from "../utils/generateCode";
import AppError from "../errors/AppError";

class ShortlinkController {

    async getAllShortlinks(request: FastifyRequest, reply: FastifyReply) {
        const shortlinks = await shortlinkRepository.getAllShortlinks();
        return reply.send({ message: 'All Shortlinks', data: shortlinks });
    }

    async getShortlink(request: FastifyRequest, reply: FastifyReply) {
        const { id } = shortlinkRequestParamSchema.parse(request.params);
        const shortlink = await shortlinkRepository.getShortlink(id);

        if (!shortlink) throw new AppError(404, 'Shortlink not found!');
        return reply.send({ message: 'Shortlink is here', shortlink });
    }

    async createShortlink(request: FastifyRequest, reply: FastifyReply) {
        const { originalUrl, code } = shortlinkRequestBodySchema.parse(request.body);
        const shortlink = await shortlinkRepository.createShortlink({ originalUrl, code: code ? code : await generateRandomCodeV2(6) });
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