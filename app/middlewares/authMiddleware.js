const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; // Cambiar por una clave segura

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado o mal formateado' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        const message =
            error.name === 'TokenExpiredError'
                ? 'El token ha expirado, por favor inicia sesión nuevamente'
                : 'Token inválido';
        res.status(403).json({ message });
    }    
};

module.exports = authenticateToken;
