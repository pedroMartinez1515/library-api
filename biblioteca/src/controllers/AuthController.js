const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');
module.exports = {
    async generateToken(request, h) {
        try {
            const { login, pass } = request.payload;

            if (login != "admin" || pass !== "admin")
                return h.response('Usuário e/ou senha incorreto(a)').code(401);

            const JWTData = {
                iss: 'api',
                sub: 'admin',
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }
            const token = jwt.sign(JWTData, authConfig.secret, { algorithm: 'HS256' });

            return { token }
        } catch (err) {
            return h.response(err.message).code(500);

        }
    }
}