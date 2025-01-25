
import Fastify from 'fastify'

const fastify = Fastify({
    logger: true
})

const services = [
    {
        "name": "accounting",
        "lastUpdate": "2024-08-01T09:58:14.199895Z",
        "lastStart": "2025-01-06T09:40:19.717561278Z"
    },
    {
        "name": "adminAPI",
        "lastUpdate": "2024-08-01T09:59:48.210799Z",
        "lastStart": "2025-01-06T09:40:19.717927961Z"
    },
    {
        "name": "amazon_sqs",
        "lastUpdate": "2024-08-28T11:31:45.96704Z",
        "lastStart": "2025-01-06T09:40:19.716687218Z"
    },
    {
        "name": "amazonsp",
        "lastUpdate": "2025-01-20T15:01:43.141325Z",
        "lastStart": "2025-01-20T15:01:52.647147397Z"
    }
];

const entrypoint = {
    "name": "accounting",
    "definition": {
        "name": "accounting",
        "entrypoints": [
            {
                "name": "accounting",
                "method": "POST",
                "type": "json",
                "authtype": "jwt",
                "jwt_perms": [
                    "accounting"
                ],
                "steps": [
                    {
                        "name": "accounting",
                        "method": "POST",
                        "type": "json",
                        "authtype": "jwt",
                        "jwt_perms": [
                            "accounting"
                        ]
                    }
                ]
            }
        ]
    }
};

fastify.register(async function (fastify, opts) {
    // Declare a route
    fastify.get('/', function (request, reply) {
        reply.send({ hello: 'world' });
    })
    
    fastify.get('/api/list-resources', function (request, reply) {
        reply.send({ resources: [] });
    });
    
    fastify.get('/api/services', function (request, reply) {
        const headers = request.headers;
        console.log('headers', headers);
        reply.header('Access-Control-Allow-Origin','*');
        reply.send({ services});
        
    });
    
    fastify.post('/login', function (request, reply) {
        console.log('login', request.body);
        reply.header('Access-Control-Allow-Origin','*');
        reply.send({ token : 'world' });
    });
    
    
    const apientries = ['/login', '/api/list-resources', '/api/services'];
    
    for (let entry of apientries) {
        fastify.options(entry, function (request, reply) {
            reply.header('Access-Control-Allow-Origin', '*');
            reply.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
            reply.header('Access-Control-Allow-Credentials', 'true');
            reply.send(null);
        });
    }
    
});
// Run the server!
fastify.listen({ port: 6631 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
});