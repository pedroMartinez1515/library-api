'use strict';
const Hapi = require('@hapi/hapi');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const authConfig = require('./config/auth.json')

const routes = require('./routes');

const { ALGORITHM } = require('./config/confs')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    server.route(routes);

    await server.register(hapiAuthJwt2);

    server.auth.strategy('jwt', 'jwt', {
        key: authConfig.secret,
        validate: function (decoded, h) {
            return { isValid: true }
        },
        verifyOptios: {
            algorithms: [ALGORITHM]
        }
    });

    server.auth.default('jwt')

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();