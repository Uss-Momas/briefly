import { FastifyReply, FastifyRequest } from "fastify";
import { shortlinkRequestBodySchema } from "../validations/requests";
import shortlinkRepository from "../repositories/ShortlinkRepository";

class ShortlinkController {
    async createShortlink(request: FastifyRequest, reply: FastifyReply) {
        const { originalUrl, code } = shortlinkRequestBodySchema.parse(request.body);
        const shortlink = await shortlinkRepository.createShortlink({ originalUrl, code: code ? code : 'asdasd' });
        return reply.status(201).send({ message: 'Shortlink URL created with success', shortlink });
    }
}

const shortlinkController = new ShortlinkController();
export default shortlinkController;