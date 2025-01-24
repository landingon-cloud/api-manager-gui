
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' });
})

fastify.post('/login', function (request, reply) {
    console.log('login', request.body);
    reply.send({ token : 'world' });
});

fastify.options('/login', function (request, reply) {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    reply.header('Access-Control-Allow-Credentials', 'true');
    reply.send(null);
});

// Run the server!
fastify.listen({ port: 6631 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
});