const jwt = require('jsonwebtoken');

const requireAdmin = (req, res, next) => {
    const authHeader = req.header('Authorization');
    let token = "";

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7);
    } else {
        token = authHeader;
    }

    try {
        const decoded = jwt.verify(token, 'kl@tun1ct0v3r@t@');
        if (decoded.role === 'ADMIN') {
            next();
        } else {
            res.status(403).json({ error: 'Acesso não autorizado' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = { requireAdmin };
