import fastify from 'fastify'
import routes from './routes/main.routes';

const server = fastify();


server.register(routes, { prefix: '/api/v1' });

server.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});