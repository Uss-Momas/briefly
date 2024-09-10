import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt';
import fastifyPlugin from "fastify-plugin";

async function jwtAuthPlugin(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    fastify.register(fastifyJwt, { secret: process.env.SECRET_KEY || 'nosecret', sign: { expiresIn: '60min' } });

    fastify.addHook('onRequest', async (request, reply) => {
        request.jwt = fastify.jwt;
    });

    fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.headers.authorization;

        if (!token) {
            return reply.status(401).send({ message: 'Authentication required' });
        }

        const decoded = request.jwt.verify<FastifyJWTOptions>(token.split(" ")[1]);
        request.user = decoded;
    });
}

const handleJwtAuthPlugin = fastifyPlugin(jwtAuthPlugin);

export default handleJwtAuthPlugin;