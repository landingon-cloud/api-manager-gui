
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

const resources = {
    services: [
        {
            format: "hsql",
            name: "accounting",
            address: "http://hsql_123:8080",
        },
        {
            format: "zshell",
            name: "adminAPI",
            address: "tcp://adminapi_adminapi_1:5555",
        },
        {
            format: "http",
            name: "amazon_sqs",
            address: "http://amazon_sqs:9324",
        },
        {
            format: "zshell",
            name: "amazonsp",
            address: "tcp://amazonsp_amazonsp_1:5555",
        },
        {
            format: "zsql",
            name: "apiman",
            address: "tcp://apiman_apiman_1:5555",
        },
        {
            format: 'zmq',
            name: 'easybook',
            address: 'tcp://apiman_apiman_1:5555'
        }
    ],
    permissions: [
        'admin',
        'user',
        'guest',
        'superuser',
        'editor',
        'viewer',
        'email',
        'phone',
        'address',
        'impersonate',
    ],
    service_images: [
        'apimanager-img:0.11',
        'apimanager-img:0.12',
        'apimanager-img:0.13',
        'apimanager-img:0.14',
    ],
    service_images_features: {
        'apimanager-img:0.11': [
            'zshell',
            'zsql',
            'http',
            'hsql',
            'zmq',
        ],
        'apimanager-img:0.12': [
            'zshell',
            'zsql',
            'http',
            'hsql',
            'zmq',
        ],
        'apimanager-img:0.13': [
            'zshell',
            'zsql',
            'http',
            'hsql',
            'zmq',
        ],
        'apimanager-img:0.14': [
            'zshell',
            'zsql',
            'http',
            'hsql',
            'zmq',
        ]
    }
};

const entrypoint = {
    "name": "accounting",
    "definition": {
        "name": "accounting",
        "entry_points": [
            {
                "method": "GET",
                "type": "sync",
                "url": "/catfile/:filename",
                "authtype": "FREE",
                "pipeline_steps": [
                    {
                        "type": "zshell",
                        "service": "tcp://zcmdexecutor_zcmdexecutor_1:5553",
                        "command": "cat ${url.filename}"
                    }
                ],
                "contentType": "text/plain; charset=utf-8"
            }
        ]
    }
};

fastify.register(async function (fastify, opts) {
    // Declare a route
    fastify.get('/', function (request, reply) {
        reply.send({ hello: 'world' });
    })
    
    fastify.get('/api/resources', function (request, reply) {
        reply.header('Access-Control-Allow-Origin','*');
        reply.send(resources);
    });
    
    fastify.get('/api/services', function (request, reply) {
        const headers = request.headers;
        console.log('headers', headers);
        reply.header('Access-Control-Allow-Origin','*');
        reply.send({ services});
        
    });

    fastify.get('/api/service/:name', function (request, reply) {
        const name = request.params.name;
        console.log('service', name);
        reply.header('Access-Control-Allow-Origin','*');
        reply.send({ service: entrypoint });
    });

    
    fastify.post('/login', function (request, reply) {
        console.log('login', request.body);
        reply.header('Access-Control-Allow-Origin','*');
        reply.send({ token : 'world' });
    });
    
    
    const apientries = ['/login', '/api/resources', '/api/services', '/api/service/:name'];
    
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