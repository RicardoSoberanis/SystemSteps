const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; // Cambiar por una clave segura

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Almacena la información del usuario autenticado
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = authenticateToken;
