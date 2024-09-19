import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt';
import fastifyPlugin from "fastify-plugin";
import AppError from "../errors/AppError";

const myCustomMessages = {
    badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
    badCookieRequestErrorMessage: 'Cookie could not be parsed in request',
    noAuthorizationInHeaderMessage: 'No Authorization was found in request.headers',
    noAuthorizationInCookieMessage: 'No Authorization was found in request.cookies',
    authorizationTokenExpiredMessage: 'Authorization token expired',
    authorizationTokenUntrusted: 'Untrusted authorization token',
    authorizationTokenUnsigned: 'Unsigned authorization token',
    // for the below message you can pass a sync function that must return a string as shown or a string
    authorizationTokenInvalid: (err: Error) => {
        return `Authorization token is invalid: ${err.message}`
    }
}

async function jwtAuthPlugin(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    fastify.register(fastifyJwt, { messages: myCustomMessages, secret: process.env.SECRET_KEY || 'nosecret', sign: { expiresIn: '60min', } });

    fastify.addHook('onRequest', async (request, reply) => {
        request.jwt = fastify.jwt;
    });

    fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.headers.authorization;

        if (!token) {
            return reply.status(401).send({ message: 'Authentication required' });
        }
        try {
            const decoded = request.jwt.verify<FastifyJWTOptions>(token.split(" ")[1]);

            request.user = decoded;
        } catch (error: any) {
            console.log(error.message, error.code);
            throw new AppError(401, "Token has expired");
        }
    });
}

const handleJwtAuthPlugin = fastifyPlugin(jwtAuthPlugin);

export default handleJwtAuthPlugin;